import 'package:flutter/material.dart';
import 'package:obole_mobile/utils/Navbar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../main.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CardPage extends StatefulWidget {
  const CardPage({super.key});

  @override
  State<CardPage> createState() => _CardPageState();
}

class _CardPageState extends State<CardPage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    handleDataSave();
    super.initState();
    _controller = AnimationController(vsync: this);
  }

  Future<String> getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String storedToken = prefs.getString('token') ?? '';
    return storedToken;
  }

  var data = [];

  Future<void> handleDataSave() async {
    String token = await getToken();

    try {
      final response = await http.get(
        Uri.parse("http://10.0.2.2:5000/card"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        setState(() {
          data = json.decode(response.body);
        });
        print('data $data');
      } else {
        print("Status Code: ${response.statusCode}");
        print("Response Body: ${response.body}");
      }
    } catch (error) {
      print("Error: $error");
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          Container(
            width: 80,
            child: const NavbarComponents(),
          ),
          Expanded(
            flex: 1,
            child: SingleChildScrollView(
              padding: EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (data.isNotEmpty)
                    Column(
                      children: [
                        Text("Cartes bancaires"),
                        SizedBox(height: 30),
                      ],
                    ),
                  if (data.isEmpty) const Text("Loading..."),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
