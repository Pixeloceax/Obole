import 'package:flutter/material.dart';
import '../main.dart';

class NavbarComponents extends StatefulWidget {
  const NavbarComponents({super.key});

  @override
  State<NavbarComponents> createState() => _NavbarComponentsState();
}

class _NavbarComponentsState extends State<NavbarComponents>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: const BoxDecoration(
        color: CustomColors.black,
      ),
      child: Container(
        width: 80,
        child: Scaffold(
          backgroundColor: Colors.transparent,
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 30),
                  child: Image.asset('lib/assets/Logo_white_bg_gray.png'),
                ),
                const Expanded(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Icon(
                        Icons.wallet,
                        color: CustomColors.white,
                        size: 50,
                      ),
                      Icon(
                        Icons.credit_card,
                        color: CustomColors.white,
                        size: 50,
                      ),
                      Icon(
                        Icons.line_axis,
                        color: CustomColors.white,
                        size: 50,
                      ),
                      Icon(
                        Icons.savings,
                        color: CustomColors.white,
                        size: 50,
                      ),
                      Icon(
                        Icons.message,
                        color: CustomColors.white,
                        size: 50,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}