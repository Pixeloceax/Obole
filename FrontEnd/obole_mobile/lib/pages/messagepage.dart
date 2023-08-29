import 'package:flutter/material.dart';

// Import components
import '../main.dart';
import '../utils/navbar.dart';

class Discussion {
  final int id;
  final String name;
  final List<String> messages;

  Discussion(this.id, this.name, this.messages);
}

class MessagePage extends StatefulWidget {
  const MessagePage({super.key});

  @override
  State<MessagePage> createState() => _MessagePageState();
}

class _MessagePageState extends State<MessagePage>
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

  final discussions = [
    Discussion(1, "Conseiller Clientèle", [
      "Bonjour, je suis intéressé par l'ouverture d'un compte d'épargne. Pouvez-vous m'en dire plus sur les taux d'intérêt actuels ?",
      "Bonjour! Bien sûr, je serais ravi de vous aider. Actuellement, notre taux d'intérêt pour les comptes d'épargne est de 1,5 % APY. C'est l'un des meilleurs taux disponibles sur le marché. Souhaitez-vous en savoir plus sur les conditions ?",
      "Absolument, nous proposons des comptes d'épargne pour les enfants avec des taux adaptés à leur tranche d'âge. Les comptes pour enfants sont exonérés de frais mensuels et ne nécessitent qu'un dépôt initial de 50 \$. C'est un excellent moyen de les initier à l'épargne.",
      "C'est une excellente option pour initier les enfants à l'épargne. Si vous avez d'autres questions concernant nos comptes d'épargne ou si vous souhaitez ouvrir un compte, n'hésitez pas à me le faire savoir. Je suis là pour vous aider.",
    ]),
    Discussion(2, "Gestionnaire de Crédit", [
      "Bonjour, j'aimerais en savoir plus sur les prêts hypothécaires que vous offrez.",
      "Bonjour! Nous proposons divers types de prêts hypothécaires, y compris à taux fixe et à taux variable. Pourriez-vous me donner une idée de vos besoins spécifiques en matière de prêt hypothécaire ?",
      "Je recherche un prêt hypothécaire à taux fixe pour l'achat d'une maison. Quelles sont les conditions et les taux actuels ?",
      "Les conditions dépendent de divers facteurs, notamment de votre pointage de crédit et de vos revenus. Nous pouvons discuter de vos détails financiers pour vous fournir des informations plus précises. Les taux actuels pour les prêts hypothécaires à taux fixe varient en fonction de la durée du prêt. Pouvons-nous organiser une réunion pour discuter de vos besoins plus en détail ?",
    ]),
    Discussion(3, "Expert en Investissement", [
      "Bonjour, je suis intéressé par l'investissement dans des fonds communs de placement. Pouvez-vous me donner des conseils à ce sujet ?",
      "Bonjour! C'est formidable que vous envisagiez d'investir. Les fonds communs de placement sont un excellent moyen de diversifier vos investissements. Pourriez-vous me donner une idée de votre tolérance au risque et de vos objectifs financiers ?",
      "Absolument. Je préfère un investissement à faible risque, mais je veux aussi voir un rendement stable à long terme.",
      "C'est compréhensible. Nous pouvons explorer des fonds communs de placement axés sur la stabilité et le rendement. Je peux vous recommander quelques options qui correspondent à vos critères. Pouvons-nous discuter davantage de votre horizon de placement et de vos préférences ?",
    ]),
    Discussion(4, "Support en Ligne", [
      "Bonjour, j'ai besoin d'aide concernant une transaction récente sur mon compte.",
      "Bonjour! Je suis là pour vous aider. Pouvez-vous me fournir plus de détails sur la transaction en question ?",
      "Oui, bien sûr. J'ai remarqué une déduction inattendue sur mon compte hier soir. Je ne suis pas sûr de ce que c'est.",
      "Je comprends votre préoccupation. Pourriez-vous me fournir le montant de la déduction ainsi que la date et la description de la transaction ? Je vais vérifier cela pour vous.",
    ])
  ];

  Discussion selectedDiscussion = Discussion(0, "", []);

  bool showDiscussion = false;

  void handleClick() {
    setState(() {
      showDiscussion = !showDiscussion;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          const SizedBox(
            width: 80,
            child: NavbarComponents(),
          ),
          Stack(
            children: [
              SizedBox(
                width: 280,
                child: ListView(
                  children: discussions
                      .map((discussion) => GestureDetector(
                            onTap: () {
                              setState(() {
                                selectedDiscussion = discussion;
                                showDiscussion = true;
                              });
                            },
                            child: Container(
                              padding: const EdgeInsets.all(20),
                              margin: const EdgeInsets.only(
                                top: 90,
                                left: 20,
                                right: 20,
                              ),
                              decoration: BoxDecoration(
                                color: showDiscussion &&
                                        selectedDiscussion.id == discussion.id
                                    ? CustomColors.purple
                                    : Colors.transparent,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: CustomColors.purple,
                                  width: 2.0,
                                ),
                              ),
                              child: Text(
                                discussion.name,
                                style: TextStyle(
                                  color: showDiscussion &&
                                          selectedDiscussion.id == discussion.id
                                      ? CustomColors.white
                                      : CustomColors.black,
                                ),
                              ),
                            ),
                          ))
                      .toList(),
                ),
              ),
              if (showDiscussion)
                Positioned.fill(
                  child: Container(
                    color: CustomColors.white,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          color: CustomColors.black,
                          child: Row(
                            children: [
                              IconButton(
                                onPressed: handleClick,
                                icon: const Icon(Icons.arrow_back,
                                    color: CustomColors.white),
                              ),
                              Text(
                                selectedDiscussion.name,
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: CustomColors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Expanded(
                          child: ListView.builder(
                            padding: const EdgeInsets.only(left: 10, right: 10),
                            itemCount: selectedDiscussion.messages.length,
                            itemBuilder: (context, index) {
                              final message =
                                  selectedDiscussion.messages[index];
                              return Container(
                                padding: const EdgeInsets.all(16),
                                margin: EdgeInsets.symmetric(
                                  horizontal: index % 2 == 0 ? 20 : 0,
                                  vertical: 10,
                                ),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(20),
                                  color: index % 2 == 0
                                      ? CustomColors.purpleClair
                                      : CustomColors.purpleFoncer,
                                ),
                                child: Text(
                                  message,
                                  style: const TextStyle(
                                      color: CustomColors.white),
                                ),
                              );
                            },
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.all(16),
                          color: CustomColors.black,
                          child: Row(
                            children: [
                              const Expanded(
                                child: TextField(
                                  decoration: InputDecoration(
                                    hintText: "Type your message...",
                                    hintStyle:
                                        TextStyle(color: CustomColors.white),
                                    border: InputBorder.none,
                                  ),
                                  style: TextStyle(color: CustomColors.white),
                                ),
                              ),
                              IconButton(
                                onPressed: () {},
                                icon: const Icon(
                                  Icons.send,
                                  color: CustomColors.purpleFoncer,
                                  size: 30,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
