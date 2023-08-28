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

  int newPlafond = 0;

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

  List<dynamic> data = [];

  Future<void> handleDataSave() async {
    String token = await getToken();

    try {
      final response = await http.get(
        Uri.parse("https://back1-one.vercel.app/card"),
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
                        ElevatedButton(
                            onPressed: () {
                              handleAdd();
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.transparent,
                              shadowColor: Colors.transparent,
                            ),
                            child: const Icon(
                              Icons.add_circle_outline,
                              color: CustomColors.black,
                              size: 60,
                            ))
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
        children: [
          Column(
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
                onPressed: () {
                  showModalBottomSheet(
                    context: context,
                    builder: (BuildContext context) {
                      return Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(height: 16),
                          TextField(
                            onChanged: (value) {
                              setState(() {
                                newPlafond = int.parse(value);
                              });
                            },
                            decoration: InputDecoration(
                              hintText: "Nouveau plafond",
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(30.0),
                                borderSide:
                                    const BorderSide(color: CustomColors.black),
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
                          const SizedBox(height: 16),
                          ElevatedButton(
                            onPressed: () {
                              handleClickButton(
                                  "plafond", data.indexOf(card), newPlafond);
                              Navigator.pop(context);
                            },
                            child: const Text("Modifier"),
                          ),
                          ElevatedButton(
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            child: const Text("Annuler"),
                          ),
                        ],
                      );
                    },
                  );
                },
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
                        handleClickButton("verrouiller", data.indexOf(card), 0),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: CustomColors.black,
                      shadowColor: Colors.transparent,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16.0),
                      ),
                    ),
                    child:
                        Text(card["locked"] ? "Déverrouiller" : "Verrouiller"),
                  )),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () =>
                        handleClickButton("opposition", data.indexOf(card), 0),
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
        ],
      ),
    );
  }

  Future<void> handleClickButton(String type, int index, int number) async {
    if (type == "plafond") {
      String token = await getToken();
      int cardId = data[index]["cardNumber"];

      Map<String, dynamic> requestData = {
        "limit": number,
      };

      String requestBody = json.encode(requestData);

      try {
        final response = await http.put(
          Uri.parse("https://back1-one.vercel.app/card/$cardId"),
          headers: {
            'Authorization': 'Bearer $token',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: requestBody,
        );

        if (response.statusCode == 200) {
          setState(() {
            handleDataSave();
          });
          // ignore: use_build_context_synchronously
          Navigator.pushReplacementNamed(context, '/card');
        } else {
          // ignore: avoid_print
          print("error: ${response.statusCode}");
          // ignore: avoid_print
          print(response.body);
        }
      } catch (error) {
        // ignore: avoid_print
        print("Error: $error");
      }
    } else if (type == "verrouiller") {
      String token = await getToken();
      int cardId = data[index]["cardNumber"];
      final locked = !data[index]["locked"];

      Map<String, dynamic> requestData = {
        "locked": locked,
      };

      String requestBody = json.encode(requestData);

      try {
        final response = await http.put(
          Uri.parse("https://back1-one.vercel.app/card/$cardId"),
          headers: {
            'Authorization': 'Bearer $token',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: requestBody,
        );

        if (response.statusCode == 200) {
          setState(() {
            handleDataSave();
          });
          // ignore: use_build_context_synchronously
          Navigator.pushReplacementNamed(context, '/card');
        } else {
          // ignore: avoid_print
          print("error: ${response.statusCode}");
          // ignore: avoid_print
          print(response.body);
        }
      } catch (error) {
        // ignore: avoid_print
        print("Error: $error");
      }
    } else if (type == "opposition") {
      String token = await getToken();
      int cardId = data[index]["cardNumber"];
      final opposition = !data[index]["opposition"];

      Map<String, dynamic> requestData = {
        "opposition": opposition,
      };

      String requestBody = json.encode(requestData);

      try {
        final response = await http.put(
          Uri.parse("https://back1-one.vercel.app/card/$cardId"),
          headers: {
            'Authorization': 'Bearer $token',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: requestBody,
        );

        if (response.statusCode == 200) {
          setState(() {
            handleDataSave();
          });
          // ignore: use_build_context_synchronously
          Navigator.pushReplacementNamed(context, '/card');
        } else {
          // ignore: avoid_print
          print("error: ${response.statusCode}");
          // ignore: avoid_print
          print(response.body);
        }
      } catch (error) {
        // ignore: avoid_print
        print("Error: $error");
      }
    }
  }

  Future<void> handleDelete(int index) async {
    String token = await getToken();
    int cardId = data[index]["cardNumber"];

    try {
      final response = await http.delete(
        Uri.parse("https://back1-one.vercel.app/card/$cardId"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        setState(() {
          handleDataSave();
        });
      } else {
        // ignore: avoid_print
        print("error: ${response.statusCode}");
      }
    } catch (error) {
      print("Error: $error");
    }
  }

  Future<void> handleAdd() async {
    String token = await getToken();

    try {
      final response = await http.post(
        Uri.parse("https://back1-one.vercel.app/card"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 201) {
        setState(() {
          handleDataSave();
        });
        print('data $data');
      } else {
        print("error: ${response.statusCode}");
      }
    } catch (error) {
      print("Error: $error");
    }
  }
}
