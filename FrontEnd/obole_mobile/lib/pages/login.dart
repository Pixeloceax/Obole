import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../main.dart';
import './dashboard.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String message = "";

  TextEditingController accountController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  Future<void> handleFormSubmit() async {
    String accountNumber = accountController.text;
    String password = passwordController.text;

    Map<String, dynamic> formDataJSON = {
      "accountNumber": accountNumber,
      "password": password,
    };

    try {
      final response = await http.post(
        Uri.parse("http://10.0.2.2:5000/login"),
        body: formDataJSON,
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data["message"] == "Login successful") {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.setString('token', data["token"]);
          prefs.setInt('tokenTimestamp', DateTime.now().millisecondsSinceEpoch);

          // Navigate to Dashboard
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => DashboardPage()),
          );
        } else {
          setState(() {
            message = "An error occurred while logging in.";
          });
        }
      } else {
        setState(() {
          message = "An error occurred while logging in.";
        });
      }
    } catch (error) {
      print(error);
      setState(() {
        message = "An error occurred while logging in.";
      });
    }
  }

  Future<void> checkTokenValidity() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    final tokenTimestamp = prefs.getInt('tokenTimestamp');

    if (token != null && tokenTimestamp != null) {
      final currentTime = DateTime.now().millisecondsSinceEpoch;
      const fiveMinutesInMillis = 5 * 60 * 1000; // 5 minutes in milliseconds

      if (currentTime - tokenTimestamp <= fiveMinutesInMillis) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => DashboardPage()),
        );
      }
    }
  }

  Future<void> clearExpiredToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final tokenTimestamp = prefs.getInt('tokenTimestamp');

    if (tokenTimestamp != null) {
      final currentTime = DateTime.now().millisecondsSinceEpoch;
      const fiveMinutesInMillis = 5 * 60 * 1000; // 5 minutes in milliseconds

      if (currentTime - tokenTimestamp > fiveMinutesInMillis) {
        // Clear token and timestamp
        prefs.remove('token');
        prefs.remove('tokenTimestamp');
      }
    }
  }

  @override
  void initState() {
    super.initState();
    checkTokenValidity();
    clearExpiredToken();
  }

  @override
  void dispose() {
    accountController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: CustomColors.black,
        height: 1000,
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 40.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'lib/assets/Logo_white_bg_gray.png',
                width: 280,
                height: 280,
              ),
              const SizedBox(height: 20.0),
              const Text(
                'Login',
                style: TextStyle(
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                  color: CustomColors.white,
                ),
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: accountController,
                decoration: InputDecoration(
                  hintText: "Numero de Compte",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30.0),
                    borderSide: const BorderSide(color: CustomColors.black),
                  ),
                  filled: true,
                  fillColor: CustomColors.white,
                  contentPadding: const EdgeInsets.symmetric(
                    vertical: 15.0,
                    horizontal: 20.0,
                  ),
                ),
                keyboardType: TextInputType.number,
                autofillHints: const [AutofillHints.username],
                onEditingComplete: () => TextInput.finishAutofillContext(),
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: passwordController,
                decoration: InputDecoration(
                  hintText: "Password",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30.0),
                    borderSide: const BorderSide(color: CustomColors.black),
                  ),
                  filled: true,
                  fillColor: CustomColors.white,
                  contentPadding: const EdgeInsets.symmetric(
                    vertical: 15.0,
                    horizontal: 20.0,
                  ),
                ),
                keyboardType: TextInputType.number,
                obscureText: true,
                autofillHints: const [AutofillHints.password],
                onEditingComplete: () => TextInput.finishAutofillContext(),
              ),
              const SizedBox(height: 40.0),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 40.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(40.0),
                  ),
                ),
                onPressed: handleFormSubmit,
                child: const Text(
                  'Login',
                  style: TextStyle(
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                    color: CustomColors.white,
                  ),
                ),
              ),
              if (message.isNotEmpty)
                Text(
                  message,
                  style: const TextStyle(
                    color: Colors.red,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
