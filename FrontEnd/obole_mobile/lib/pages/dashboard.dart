import 'package:flutter/material.dart';
import 'package:obole_mobile/main.dart';
import '../utils/Navbar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  _DashboardPageState createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
    handleDataSave();
  }

  Future<String> getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String storedToken = prefs.getString('token') ?? '';
    return storedToken;
  }

  var data = {};

  Future<void> handleDataSave() async {
    String token = await getToken(); // Await the token retrieval

    try {
      final response = await http.get(
        Uri.parse("http://10.0.2.2:5000/user"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        setState(() {
          data = jsonDecode(response.body); // Store the data in the state
        });
        print(data);
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
            child: Container(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (data.isNotEmpty)
                    Container(
                      child: Column(
                        children: [
                          Text(
                            "Bonjour, ${data['Information']['name']}",
                            style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: CustomColors.black,
                            ),
                          ),
                        ],
                      ),
                      
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
