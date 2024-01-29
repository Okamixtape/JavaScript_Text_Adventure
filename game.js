const startPopup = document.getElementById('start-popup');
const startButton = document.getElementById('start-button');
const gameContent = document.getElementById('game-content');
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const cancelButton = document.getElementById('cancel-button');

const state = {}

function startGame() {
    Object.keys(state).forEach(key => delete state[key])
    startPopup.style.display = 'flex';
    gameContent.style.display = 'none';
}

startButton.addEventListener('click', () => {
    startPopup.style.display = 'none'; // Cache la pop-up
    gameContent.style.display = 'block';
    showTextNode(1); // Commence le jeu
});

cancelButton.addEventListener('click', startGame);

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.textContent = textNode.text

    document.body.style.backgroundImage = textNode.backgroundImage || "";

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.filter(showOption).forEach(option => {
        const button = document.createElement('button')
        button.textContent = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    Object.assign(state, option.setState) 
    showTextNode(nextTextNodeId)
}

function generateBackgroundImageUrl(id) {
    return `url('images/node_${id}.png')`;
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a dark and mysterious room, spotting a curious magic stone.',
        options: [
            {
                text: 'Take the stone',
                setState: { blackStone: true },
                nextText: 2
            },
            {
                text: 'Leave the stone',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You leave the room and embark on a new adventure, where you come across a traveling merchant.',
        options: [
            {
                text: 'Trade the mysterious stone for a sword',
                requiredState: (currentState) => currentState.blackStone,
                setState: { blackStone: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the mysterious stone for a shield',
                requiredState: (currentState) => currentState.blackStone,
                setState: { blackStone: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant, you start feeling tired and arrive at the small village of Toki, near an imposing castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find an inn to rest',
                nextText: 5
            },
            {
                text: 'Find a stable and sleep on a bed of straw',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you collapse while exploring the castle. In your sleep, you are devoured by a terrible monster.',
        options: [
            {
                text: 'You have lost, you need to restart the adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Without money for a room, you sneak into the nearest inn and fall asleep. A few hours later, the innkeeper finds you and calls a guard to arrest you.',
        options: [
            {
                text: 'You have lost, you need to restart the adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up feeling refreshed after resting in the stable, ready to explore the castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'While exploring the castle, you encounter a horrible golden dragon spewing sulfuric acid. What will you do?',
        options: [
            {
                text: 'Try to run away',
                nextText: 8
            },
            {
                text: 'Attack the dragon with the sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind the shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the mysterious stone at the dragon',
                requiredState: (currentState) => currentState.blackStone,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'You try to flee but are overtaken by a wave of magma.',
        options: [
            {
                text: 'You have lost, you need to restart the adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You really thought the dragon would be scared of your sword, which looks like a toothpick to it?',
        options: [
            {
                text: 'You have lost, you need to restart the adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'The dragon laughs in your face as you try to hide behind your shield.',
        options: [
            {
                text: 'You have lost, you need to restart the adventure',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'You throw the mysterious stone at the dragon, causing a huge explosion. After the light from the stone fades, the dragon turns to stone. Victorious, you decide to take over the castle and live there with the charming Princess Gasparette.',
        options: [
            {
                text: 'Congratulations. You have won the game!',
                nextText: -1
            }
        ]
    },
    // New Nodes
    {
        id: 12,
        text: "On your journey, you stumble upon a mysterious, ancient library hidden in the forest. It's rumored to contain powerful knowledge.",
        options: [
            {
                text: 'Search the library for useful information or spells',
                nextText: 13
            },
            {
                text: 'Ignore the library and continue on your path',
                nextText: 3
            }
        ]
    },
    {
        id: 13,
        text: 'Inside the library, you find a magical tome granting the power of invisibility.',
        options: [
            {
                text: 'Take the tome and use its power',
                setState: { invisibilityTome: true },
                nextText: 3
            },
            {
                text: 'Leave the tome and exit the library',
                nextText: 3
            }
        ]
    },
    {
        id: 14,
        text: 'Using the tome, you become invisible and sneak past the dragon, discovering a hidden chamber filled with treasure and a map to a secret kingdom.',
        options: [
            {
                text: 'Take the treasure and explore the secret kingdom',
                nextText: 15
            }
        ]
    },
    {
        id: 15,
        text: 'The secret kingdom is a peaceful land in need of a hero. You are hailed as a savior and decide to stay and become their guardian.',
        options: [
            {
                text: 'You have found a new home. Congratulations on winning the game!',
                nextText: -1
            }
        ]
    }
].map(node => ({
    ...node,
    backgroundImage: generateBackgroundImageUrl(node.id)
}));

startGame()