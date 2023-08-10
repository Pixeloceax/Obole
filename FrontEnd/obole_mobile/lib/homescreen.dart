import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text("Home"),
    ),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(
            "Home",
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/login');
            },
            child: Text("Login"),
          ),
        ],
      ),
    ),
  );
}