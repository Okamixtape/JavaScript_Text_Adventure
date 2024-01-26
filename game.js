const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

const state = {}

function startGame() {
    Object.keys(state).forEach(key => delete state[key])
    showTextNode(1)
}

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
        text: 'Basile se réveille dans une pièce sombre et mystérieuse, il aperçoit une curieuse pierre magique.',
        options: [
            {
                text: 'Prendre la pierre',
                setState: { blackStone: true },
                nextText: 2
            },
            {
            text: 'Laisser la pierre',
            nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Basile sort de la pièce et part pour une nouvelle aventure, à ce moment-là il croise un marchand itinérant.',
        options: [
            {
                text: 'Échanger la pierre mystérieuse contre une épée',
                requiredState: (currentState) => currentState.blackStone,
                setState: { blackStone: false, sword: true },
                nextText: 3
            },
            {
                text: 'Échanger la pierre mystérieuse contre un bouclier',
                requiredState: (currentState) => currentState.blackStone,
                setState: { blackStone: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignorer le marchand',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Après avoir quitté le marchand, Basile commence à se sentir fatigué et arrive dans le petit village de Toki près duquel un imposant château demeure.',
        options: [
            {
                text: 'Explorer le château',
                nextText: 4
            },
            {
                text: 'Trouver une auberge pour se reposer',
                nextText: 5
            },
            {
                text: 'Trouver une étable et dormir sur un lit de paille ',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'Basile est tellement fatigué qu il s affale alors qu il explorait le château, dans son sommeil il est tué par un terrible monstre qui l avale tout cru.',
        options: [
            {
                text: 'Basile a perdu, il faut recommencer l aventure',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Sans argent pour pouvoir louer une chambre Basile s introduit furtivement dans l auberge la plus proche et tombe de sommeil. Après s être endormi quelques heures, le gérant de l auberge le trouve endormi sur le lit, il appelle alors un garde pour l arrêter et le mettre au cachot.',
        options: [
            {
                text: 'Basile a perdu, il faut recommencer l aventure',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'Basile se réveille en pleine forme après s être reposé dans l étable, prêt à explorer le château.',
        options: [
            {
                text: 'Explorer le château',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'Alors que Basile explore le château, il tombe sur un horrible dragon doré crachant de l acide sulfurique. Que va-t-il faire ???',
        options: [
            {
                text: 'Essayer de s enfuir',
                nextText: 8
            },
            {
                text: 'Attaquer le dragon avec l épée',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Se cacher derrière le bouclier',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Lancer la pierre mystérieuse sur le dragon',
                requiredState: (currentState) => currentState.blackStone,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Basile essaie de fuir mais il est rattrapé par une vague de magma qui l emporte sur le champ.',
        options: [
            {
                text: 'Basile a perdu, il faut recommencer l aventure',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'Basile avait vraiment cru que ce dragon pouvait avoir peur de son épée, qui pour lui ressemble à un cure dent argenté préparé pour son soupet ?',
        options: [
            {
                text: 'Basile a perdu, il faut recommencer l aventure',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'Le dragon rit au nez de Basile alors qu il essaye de se cacher derrière son bouclier.',
        options: [
            {
                text: 'Basile a perdu, il faut recommencer l aventure',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'Basile lance la pierre mystérieuse sur le dragon, une énorme explosion se produit et après le flash de lumière produit par la pierre le dragon se pétrifia. Basile étant victorieux, il décida de prendre contrôle du château et d y vivre avec sa charmante princesse Gasparette.',
        options: [
            {
                text: 'Félicitations. Basile a gagné la partie !',
                nextText: -1
            }
        ]
    }
].map(node => ({
    ...node,
    backgroundImage: generateBackgroundImageUrl(node.id)
}));

startGame()