import 'package:flutter/widgets.dart';

class EpargnePage extends StatefulWidget {
  const EpargnePage({super.key});

  @override
  State<EpargnePage> createState() => _EpargnePageState();
}

class _EpargnePageState extends State<EpargnePage>
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
    return const Text("Epargne Page");
  }
}
