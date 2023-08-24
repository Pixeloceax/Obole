import 'package:flutter/material.dart';
import 'package:obole_mobile/main.dart'; // You might need to adjust the import path
import 'package:obole_mobile/pages/login.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  int? selectedGender = 1;
  String message = "";
  TextEditingController nomController = TextEditingController();
  TextEditingController prenomController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController adresseController = TextEditingController();
  TextEditingController telController = TextEditingController();

  Future<void> handleFormSubmit() async {
    String name = nomController.text;
    String lastName = prenomController.text;
    String email = emailController.text;
    String address = adresseController.text;
    String phone = telController.text;
    String gender = selectedGender == 1 ? "Homme" : "Femme";

    if (name.isEmpty ||
        lastName.isEmpty ||
        email.isEmpty ||
        address.isEmpty ||
        phone.isEmpty) {
      setState(() {
        message = "Veuillez remplir tous les champs";
      });
      return;
    }

    Map<String, dynamic> formDataJSON = {
      "name": name,
      "lastName": lastName,
      "phone": phone,
      "email": email,
      "gender": gender,
      "address": address,
    };
    print(formDataJSON);

    try {
      final response = await http.post(
        Uri.parse("https://back1-one.vercel.app/register"),
        headers: {"Content-Type": "application/json"},
        body: json.encode(formDataJSON),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data["message"] == "Login successful") {
          // ignore: use_build_context_synchronously
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const LoginPage()),
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
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: CustomColors.black,
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 40.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'lib/assets/Logo_white_bg_gray.png',
                width: 200,
                height: 200,
              ),
              const SizedBox(height: 20.0),
              const Text(
                'Register',
                style: TextStyle(
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                  color: CustomColors.white,
                ),
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: nomController,
                decoration: InputDecoration(
                  hintText: "Nom",
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
                keyboardType: TextInputType.text,
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: prenomController,
                decoration: InputDecoration(
                  hintText: "Prenom",
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
                keyboardType: TextInputType.text,
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: emailController,
                decoration: InputDecoration(
                  hintText: "Email",
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
                keyboardType: TextInputType.text,
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: adresseController,
                decoration: InputDecoration(
                  hintText: "Adresse",
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
                keyboardType: TextInputType.text,
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: telController,
                decoration: InputDecoration(
                  hintText: "Numéro de téléphone",
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
              const SizedBox(height: 20.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Homme',
                    style: TextStyle(
                      fontSize: 20.0,
                      fontWeight: FontWeight.bold,
                      color: CustomColors.white,
                    ),
                  ),
                  Radio<int>(
                    value: 1,
                    groupValue: selectedGender,
                    onChanged: (value) {
                      setState(() {
                        selectedGender = value;
                      });
                    },
                  ),
                  const Text(
                    'Femme',
                    style: TextStyle(
                      fontSize: 20.0,
                      fontWeight: FontWeight.bold,
                      color: CustomColors.white,
                    ),
                  ),
                  Radio<int>(
                    value: 2,
                    groupValue: selectedGender,
                    onChanged: (value) {
                      setState(() {
                        selectedGender = value;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 40.0),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 40.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(40.0),
                  ),
                ),
                onPressed: handleFormSubmit, // Update this onPressed function
                child: const Text(
                  'Register', // Change the button text
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
