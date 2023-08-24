import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:obole_mobile/main.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../utils/Navbar.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class EpargnePage extends StatefulWidget {
  const EpargnePage({Key? key}) : super(key: key);

  @override
  State<EpargnePage> createState() => _EpargnePageState();
}

class _EpargnePageState extends State<EpargnePage> {
  List<dynamic> data = [];
  String selectedType = "A";

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      String token = await getToken();
      final response = await http.get(
        Uri.parse("https://back1-one.vercel.app/saving"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        setState(() {
          data = jsonDecode(response.body);
        });
      } else {
        Navigator.of(context).pushReplacementNamed('/login');
      }
    } catch (error) {
      Navigator.of(context).pushReplacementNamed('/login');
    }
  }

  Future<String> getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String storedToken = prefs.getString('token') ?? '';
    return storedToken;
  }

  Future<void> handleSaving(String type) async {
    try {
      String token = await getToken();
      final response = await http.post(
        Uri.parse("https://back1-one.vercel.app/saving"),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({"type": type}),
      );

      if (response.statusCode == 200) {
        fetchData();
      } else {
        // Handle error scenario
      }
    } catch (error) {
      // Handle error scenario
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CustomColors.white,
      body: Row(
        children: [
          Container(
            width: 80,
            child: const NavbarComponents(),
          ),
          Expanded(
            flex: 1,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (data.isNotEmpty)
                    const Text(
                      "Epargnes",
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  const SizedBox(height: 20),
                  Column(
                    children: data.map<Widget>((account) {
                      return Container(
                        decoration: BoxDecoration(
                          color: CustomColors.purple,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        padding: const EdgeInsets.all(16),
                        margin: const EdgeInsets.only(bottom: 16),
                        child: Column(
                          children: [
                            Text(
                              "Type: ${account['type']}",
                              style: const TextStyle(
                                fontSize: 28,
                                fontWeight: FontWeight.bold,
                                color: CustomColors.white,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              "Numéro de compte: ${account['savingAccountNumber']}",
                              style: const TextStyle(
                                fontSize: 12,
                                color: CustomColors.white,
                              ),
                            ),
                            Text(
                              "Solde: ${account['savingsBalance']} €",
                              style: const TextStyle(
                                fontSize: 16,
                                color: CustomColors.white,
                              ),
                            ),
                            Text(
                              "Taux d'intérêt: ${account['interestRate']}%",
                              style: const TextStyle(
                                fontSize: 16,
                                color: CustomColors.white,
                              ),
                            ),
                            Text(
                              "Prochain Solde: ${account['savingsBalance'] * (1 + account['interestRate'] / 100)} €",
                              style: const TextStyle(
                                fontSize: 16,
                                color: CustomColors.white,
                              ),
                            ),
                          ],
                        ),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        color: CustomColors.purple,
                        child: DropdownButton<String>(
                          value: selectedType,
                          onChanged: (value) {
                            setState(() {
                              selectedType = value!;
                            });
                          },
                          items: const [
                            DropdownMenuItem(value: "A", child: Text("A")),
                            DropdownMenuItem(
                                value: "jeune", child: Text("Jeune")),
                          ],
                          style: const TextStyle(
                            fontSize: 20,
                            color: CustomColors.white,
                          ),
                          dropdownColor: CustomColors.purple,
                          padding: const EdgeInsets.all(4),
                        ),
                      ),
                      const SizedBox(width: 10),
                      ElevatedButton(
                        onPressed: () {
                          handleSaving(selectedType);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: CustomColors.black,
                          padding: const EdgeInsets.all(5),
                          shape: const CircleBorder(),
                          disabledBackgroundColor: CustomColors.white,
                        ),
                        child: const Icon(Icons.add, size: 36),
                      ),
                    ],
                  ),
                  if (data.isEmpty)
                    const Center(child: CircularProgressIndicator()),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
