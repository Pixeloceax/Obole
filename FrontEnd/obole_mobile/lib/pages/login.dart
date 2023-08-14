import 'package:flutter/material.dart';
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

          // ignore: use_build_context_synchronously
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const DashboardPage()),
          );
        } else {
          message = "An error occurred while logging in.";
        }
      } else {
        message = "An error occurred while logging in.";
      }
    } catch (error) {
      // ignore: avoid_print
      print(error);
      message = "An error occurred while logging in.";
    }
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
