import 'package:flutter/material.dart';

// import dependencies
import 'package:flutter_dotenv/flutter_dotenv.dart';

// import components
import 'package:obole_mobile/pages/homescreen.dart';
import 'package:obole_mobile/pages/login.dart';
import 'package:obole_mobile/pages/register.dart';
import 'package:obole_mobile/pages/dashboard.dart';
import 'package:obole_mobile/pages/cardpage.dart';
import 'package:obole_mobile/pages/messagepage.dart';
import 'package:obole_mobile/pages/epargnepage.dart';

void main() {
  runApp(MyApp());
  dotenv.load(fileName: ".env");
}

class CustomColors {
  static const Color white = Color(0xFFF3F3FF);
  static const Color black = Color(0xFF272A31);
  static const Color purple = Color(0xFF5F65AB);
  static const Color gray = Color(0xFF8D8F98);
  static const Color purpleClair = Color(0xFF7089C2);
  static const Color purpleFoncer = Color(0xFF334777);
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Obole Bank',
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/login': (context) => const LoginPage(),
        '/register': (context) => const RegisterPage(),
        '/dashboard': (context) => const DashboardPage(),
        '/card': (context) => const CardPage(),
        '/epargne': (context) => const EpargnePage(),
        '/message': (context) => const MessagePage(),
      },
    );
  }
}
