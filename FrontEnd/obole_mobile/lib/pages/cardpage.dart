import 'package:flutter/material.dart';
import 'package:obole_mobile/main.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../utils/navbar.dart';

class CardPage extends StatefulWidget {
  const CardPage({Key? key}) : super(key: key);

  @override
  State<CardPage> createState() => _CardPageState();
}

class _CardPageState extends State<CardPage>
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
        Navigator.of(context).pushReplacementNamed('/login');
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
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (data.isNotEmpty)
                    Column(
                      children: [
                        const Text(
                          "Cartes bancaires",
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 30),
                        for (var card in data) _buildCardWidget(card),
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

  Widget _buildCardWidget(Map<String, dynamic> card) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: CustomColors.purple,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Carte ${data.indexOf(card) + 1}",
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            "**** **** **** ${card["cardNumber"].toString().substring(card["cardNumber"].toString().length - 4)}",
            style: const TextStyle(
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 16),
          Center(
              child: ElevatedButton(
            onPressed: () => handleClickButton("plafond", data.indexOf(card)),
            style: ElevatedButton.styleFrom(
              backgroundColor: CustomColors.black,
              shadowColor: Colors.transparent,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16.0),
              ),
            ),
            child: const Text("Modifier le plafond"),
          )),
          const SizedBox(height: 16),
          Text(
            "Plafond utilisé: ${card["used"]} € / ${card["limit"]} €",
            style: const TextStyle(
              fontSize: 16,
            ),
          ),
          LinearProgressIndicator(
            value: card["used"] / card["limit"],
          ),
          const SizedBox(height: 16),
          Column(
            children: [
              Center(
                  child: ElevatedButton(
                onPressed: () =>
                    handleClickButton("verrouiller", data.indexOf(card)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: CustomColors.black,
                  shadowColor: Colors.transparent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16.0),
                  ),
                ),
                child: Text(card["locked"] ? "Déverrouiller" : "Verrouiller"),
              )),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () =>
                    handleClickButton("opposition", data.indexOf(card)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: CustomColors.black,
                  shadowColor: Colors.transparent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16.0),
                  ),
                ),
                child: Text(card["opposition"]
                    ? "Annuler l'Opposition"
                    : "Faire Opposition"),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () async {
                  await handleDelete(data.indexOf(card));
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: CustomColors.black,
                  shadowColor: Colors.transparent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16.0),
                  ),
                ),
                child: const Text("Supprimer"),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> handleClickButton(String type, int index) async {
    // Your button handling logic here
  }

  Future<void> handleDelete(int index) async {
    // Your delete button handling logic here
  }
}
