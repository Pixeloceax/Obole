import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:obole_mobile/main.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fl_chart/fl_chart.dart';
import 'dart:math';
import 'package:obole_mobile/utils/navbar.dart';

class StatistiquePage extends StatefulWidget {
  const StatistiquePage({Key? key}) : super(key: key);

  @override
  _StatistiquePageState createState() => _StatistiquePageState();
}

class _StatistiquePageState extends State<StatistiquePage> {
  List<dynamic> transactions = [];

  @override
  void initState() {
    super.initState();
    handleDataFetch();
  }

  Future<String> getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String storedToken = prefs.getString('token') ?? '';
    return storedToken;
  }

  Future<void> handleDataFetch() async {
    String token = await getToken();
    print("token: $token");

    try {
      final response = await http.get(
        Uri.parse("http://10.0.2.2:5000/stats"),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      print("response: ${response.body}");

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        if (responseData is Map<String, dynamic>) {
          setState(() {
            transactions = responseData['transactions'];
          });
          print("transactions: $transactions");
        } else {
          Navigator.of(context).pushReplacementNamed('/login');
        }
      } else {
        Navigator.of(context).pushReplacementNamed('/login');
      }
    } catch (error) {
      print("Error: $error");
    }
  }

  Widget buildDoughnutChart() {
    var transactionAmount = transactions.length;

    return Container(
      height: 300,
      child: Row(
        children: [
          Expanded(
            child: PieChart(
              PieChartData(
                sections: [
                  for (var entry in transactions)
                    PieChartSectionData(
                      value: entry['amount'].toDouble(),
                      color: getRandomColor(),
                      showTitle: false,
                    ),
                  PieChartSectionData(
                    value: transactionAmount.toDouble(),
                    color: getRandomColor(),
                    showTitle: false,
                  ),
                ],
                sectionsSpace: 0,
                centerSpaceRadius: 40,
                borderData: FlBorderData(show: false),
              ),
              swapAnimationDuration: const Duration(milliseconds: 800),
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (var entry in transactions)
                Row(
                  children: [
                    Container(
                      width: 16,
                      height: 16,
                      color: getRandomColor(),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      entry['description'],
                      style: const TextStyle(fontSize: 12),
                    ),
                  ],
                ),
              Row(
                children: [
                  Container(
                    width: 16,
                    height: 16,
                    color: getRandomColor(),
                  ),
                  const SizedBox(width: 4),
                  const Text(
                    'Transactions',
                    style: TextStyle(fontSize: 12),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Color getRandomColor() {
    final random = Random();
    return Color.fromRGBO(
      random.nextInt(256),
      random.nextInt(256),
      random.nextInt(256),
      1,
    );
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
          Visibility(
            visible: true,
            child: Expanded(
              child: Center(
                child: transactions.isNotEmpty
                    ? Container(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text(
                              "Payments and Transactions",
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: CustomColors.black,
                              ),
                            ),
                            const SizedBox(height: 16),
                            buildDoughnutChart(),
                          ],
                        ),
                      )
                    : const CircularProgressIndicator(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
