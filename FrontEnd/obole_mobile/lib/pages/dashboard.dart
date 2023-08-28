import 'package:flutter/material.dart';
import 'package:obole_mobile/main.dart';
import '../utils/Navbar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

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
    handleDataFetch();
    handleDatatransaction();
  }

  Future<String> getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String storedToken = prefs.getString('token') ?? '';
    return storedToken;
  }

  var data = {};
  var dataPayment = [];
  var dataTransaction = [];

  Future<void> handleDataSave() async {
    String token = await getToken();

    try {
      final response = await http.get(
        Uri.parse("https://back1-one.vercel.app/user"),
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
      print("Error: $error");
    }
  }

  Future<void> handleDataFetch() async {
    String token = await getToken();
    print("token; $token");

    try {
      final response = await http.get(
        Uri.parse("https://back1-one.vercel.app/payment"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        setState(() {
          dataPayment = jsonDecode(response.body);
        });
      } else {
        Navigator.of(context).pushReplacementNamed('/login');
      }
    } catch (error) {
      print("Error: $error");
    }
  }

  Future<void> handleDatatransaction() async {
    String token = await getToken();
    print("token; $token");

    try {
      final response = await http.get(
        Uri.parse("https://back1-one.vercel.app/transaction"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      print("response: ${response.body}");

      if (response.statusCode == 200) {
        setState(() {
          dataTransaction = jsonDecode(response.body);
        });
        for (var i = 0; i < dataTransaction.length; i++) {
          print(
              "datatransaction: ${dataTransaction[i]['destinationAccount'].runtimeType}, ${data['Account']['accountNumber'].runtimeType}");
          print(int.tryParse(dataTransaction[i]['destinationAccount']) ==
              data['Account']['accountNumber']);
        }
      } else {
        Navigator.of(context).pushReplacementNamed('/login');
      }
    } catch (error) {
      print("Error: $error");
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('tokenTimestamp');
    Navigator.of(context).pushReplacementNamed('/login');
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
                        Row(
                          children: [
                            RichText(
                              text: TextSpan(
                                style: const TextStyle(
                                  decoration: TextDecoration.underline,
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: CustomColors.black,
                                ),
                                children: <TextSpan>[
                                  const TextSpan(
                                    text: "Bonjour, ",
                                  ),
                                  TextSpan(
                                    text: "${data['Information']['name']}",
                                    style: const TextStyle(
                                      color: CustomColors.purple,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                showModalBottomSheet(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return Column(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        const SizedBox(height: 16),
                                        ElevatedButton(
                                          onPressed: () {
                                            logout();
                                          },
                                          child: const Text("Déconnexion"),
                                        ),
                                        ElevatedButton(
                                          onPressed: () {
                                            Navigator.pop(context);
                                          },
                                          child: const Text("Close"),
                                        ),
                                      ],
                                    );
                                  },
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                shadowColor: Colors.transparent,
                              ),
                              child: const Icon(
                                Icons.account_circle,
                                color: CustomColors.black,
                                size: 50,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 30),
                        Row(
                          children: [
                            Container(
                              width: MediaQuery.of(context).size.width * 0.68,
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: CustomColors.purple,
                                borderRadius: BorderRadius.circular(30),
                              ),
                              child: Column(
                                children: [
                                  const Text(
                                    "Compte Courant",
                                    style: TextStyle(
                                      color: CustomColors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ),
                                  ),
                                  const SizedBox(height: 30),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        "N° **** ${data['Account']['accountNumber'].toString().substring(data['Account']['accountNumber'].toString().length - 4)}",
                                        style: const TextStyle(
                                          color: CustomColors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 20,
                                        ),
                                      ),
                                      Text(
                                        "${data['Balance']['balance']} €",
                                        style: const TextStyle(
                                          color: CustomColors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 20,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 20),
                                  const Divider(
                                      color: CustomColors.white,
                                      thickness: 2,
                                      height: 32),
                                  const SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const Text(
                                            "CB VISA",
                                            style: TextStyle(
                                              color: CustomColors.white,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 20,
                                            ),
                                          ),
                                          const SizedBox(height: 10),
                                          Text(
                                            "N° **** ${data['Card'][0]['cardNumber'].toString().substring(data['Card'][0]['cardNumber'].toString().length - 4)}",
                                            style: const TextStyle(
                                              color: CustomColors.white,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 20,
                                            ),
                                          ),
                                        ],
                                      ),
                                      IconButton(
                                        onPressed: () {
                                          Navigator.of(context)
                                              .pushReplacementNamed('/card');
                                        },
                                        icon: const Icon(
                                          Icons.arrow_right,
                                          color: CustomColors.white,
                                          size: 50,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 30),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 30),
                        Row(
                          children: [
                            Container(
                              width: MediaQuery.of(context).size.width * 0.68,
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: CustomColors.black,
                                borderRadius: BorderRadius.circular(30),
                              ),
                              child: Column(
                                children: [
                                  const Text(
                                    "Information",
                                    style: TextStyle(
                                      color: CustomColors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20,
                                    ),
                                  ),
                                  Column(
                                    children: [
                                      Row(
                                        children: [
                                          const SizedBox(width: 30),
                                          const Text("Message",
                                              style: TextStyle(
                                                color: CustomColors.white,
                                                fontSize: 20,
                                              )),
                                          const SizedBox(width: 10),
                                          ElevatedButton(
                                            onPressed: () {
                                              Navigator.of(context)
                                                  .pushReplacementNamed(
                                                      '/message');
                                            },
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor:
                                                  Colors.transparent,
                                              shadowColor: Colors.transparent,
                                            ),
                                            child: const Icon(
                                              Icons.arrow_right,
                                              color: CustomColors.white,
                                              size: 50,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const Text("Parler avec un conseiller",
                                          style: TextStyle(
                                            color: CustomColors.white,
                                            fontSize: 16,
                                          )),
                                    ],
                                  ),
                                  const SizedBox(height: 30),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 30),
                        Row(
                          children: [
                            Container(
                              width: MediaQuery.of(context).size.width * 0.68,
                              margin: const EdgeInsets.only(top: 10),
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: CustomColors.purple,
                                borderRadius: BorderRadius.circular(30),
                                boxShadow: [
                                  BoxShadow(
                                    color: CustomColors.black.withOpacity(0.3),
                                    blurRadius: 5,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                              ),
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      const Flexible(
                                        flex: 2,
                                        child: Text(
                                          "Livrets",
                                          style: TextStyle(
                                            color: CustomColors.white,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 24,
                                          ),
                                        ),
                                      ),
                                      GestureDetector(
                                        onTap: () {
                                          Navigator.of(context)
                                              .pushReplacementNamed('/epargne');
                                        },
                                        child: const Icon(
                                          Icons.arrow_right,
                                          color: CustomColors.white,
                                          size: 50,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 20),
                                  Column(
                                    children: data['SavingsAccount']
                                        .map<Widget>((livret) {
                                      return Container(
                                        margin:
                                            const EdgeInsets.only(bottom: 10),
                                        child: Column(
                                          children: [
                                            Text(
                                              livret['type'],
                                              style: const TextStyle(
                                                color: CustomColors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 24,
                                              ),
                                            ),
                                            Text(
                                              "${livret['savingsBalance']} €",
                                              style: const TextStyle(
                                                color: CustomColors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 24,
                                              ),
                                            ),
                                            const Text(
                                              "Previsionelle",
                                              style: TextStyle(
                                                color: CustomColors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 24,
                                              ),
                                            ),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: [
                                                Text(
                                                  livret['type'] == "A"
                                                      ? "${(2 / 100) * livret['savingsBalance']} €"
                                                      : "${(3 / 100) * livret['savingsBalance']} €",
                                                  style: const TextStyle(
                                                    color: CustomColors.white,
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 24,
                                                  ),
                                                ),
                                                Text(
                                                  livret['type'] == "A"
                                                      ? "2%"
                                                      : "3%",
                                                  style: const TextStyle(
                                                    color: CustomColors.white,
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 24,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      );
                                    }).toList(),
                                  ),
                                ],
                              ),
                            )
                          ],
                        ),
                        const SizedBox(height: 30),
                        Container(
                          width: MediaQuery.of(context).size.width * 0.68,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: CustomColors.black,
                            borderRadius: BorderRadius.circular(30),
                          ),
                          child: Column(
                            children: [
                              const Text(
                                "Transactions",
                                style: TextStyle(
                                  color: CustomColors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                              const SizedBox(height: 16),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  Column(
                                    children: [
                                      const Text(
                                        "Gain",
                                        style: TextStyle(
                                          color: CustomColors.white,
                                          fontSize: 20,
                                        ),
                                      ),
                                      for (var i = 0, j = 0;
                                          i < dataTransaction.length;
                                          i++)
                                        if (int.tryParse(dataTransaction[i]
                                                    ['destinationAccount']
                                                .toString()) ==
                                            data['Account']['accountNumber'])
                                          for (j; j < 5; j++)
                                            Container(
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      vertical: 2),
                                              child: Column(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: [
                                                  Text(
                                                    "${dataTransaction[i]['amount']} €",
                                                    style: const TextStyle(
                                                      color: CustomColors.white,
                                                      fontSize: 16,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      const Text(
                                        "Deficit",
                                        style: TextStyle(
                                          color: CustomColors.white,
                                          fontSize: 20,
                                        ),
                                      ),
                                      for (var i = 0;
                                          i < dataPayment.length && i < 5;
                                          i++)
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              vertical: 2),
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                "- ${dataPayment[i]['amount']} €",
                                                style: const TextStyle(
                                                  color: CustomColors.white,
                                                  fontSize: 16,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 30),
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
