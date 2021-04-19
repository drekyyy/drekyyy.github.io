const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const body=document.body
var answerCount=document.getElementById('correctAnswerCount')

let shuffledQuestions, currectQuestionIndex
var img1, img2, img3, img4, src
img1 = document.createElement('img')
img2 = document.createElement('img')
img3 = document.createElement('img')
img4 = document.createElement('img')
const div=document.createElement('div') //pop up window nazwane div poprostu, pojawia sie po nacisnieciu next
const okButton=document.createElement('button')
const RestartButton=document.createElement('button')
const divContainer=document.getElementById('container')
// img.src="https://www.google.com/intl/en_com/images/logo_plain.png"
// src=document.getElementById("img1")
// src.appendChild(img);
div.style.maxWidth='80%'
div.style.width='900px'
//div.style.height='10%'
div.style.backgroundColor='white'
div.style.position='absolute'
div.style.boxShadow= '0 0 10px 2px'
div.style.padding='15px'
div.style.display='flex'
div.style.alignItems='center'
div.style.flexDirection='column'
div.style.textAlign='center'
okButton.style.padding='5px 10px'
okButton.style.marginTop='15px'
okButton.style.width='80px'
okButton.innerText='Ok'
okButton.style.backgroundColor='blue'
okButton.style.color='white'
okButton.style.border='none'

RestartButton.style.padding='5px 10px'
RestartButton.style.marginTop='15px'
RestartButton.style.width='120px'
RestartButton.innerText='Restart'
RestartButton.style.backgroundColor='blue'
RestartButton.style.color='white'
RestartButton.style.border='none'

let answerFlag=0;
let correctAnswerCount=0;
//startButton.addEventListener('click', startGame)
startButton.addEventListener('click', () => {
    if (startButton.innerText=='Koniec'){
        div.innerText="To było ostatnie pytanie :)\n\n"+shuffledQuestions[currentQuestionIndex].explanation+ '\n\nUzbierane punkty: '+correctAnswerCount+' na '+shuffledQuestions.length+' możliwych.'
        body.append(div)
        div.append(RestartButton)
        divContainer.style.filter='blur(8px)'
    }else {
        startGame();
    }
})
nextButton.addEventListener('click', () => {
    div.innerText=shuffledQuestions[currentQuestionIndex].explanation
    body.append(div)
    div.append(okButton)
    divContainer.style.filter='blur(8px)'
    }
)
okButton.addEventListener('click', () =>{
    currentQuestionIndex++
    setNextQuestion()
})

RestartButton.addEventListener('click', startGame)


function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    correctAnswerCount=0
    answerCount.innerHTML='Poprawne odpowiedzi: '+correctAnswerCount+' / '+shuffledQuestions.length
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = 1+currentQuestionIndex+'. '+question.question
    if (question.image1 !== 'blank') {
        img1.src = question.image1
        src = document.getElementById("img1")
        src.appendChild(img1)
    }
    if (question.image2 !== 'blank') {
        img2.src = question.image2
        src = document.getElementById("img2")
        src.appendChild(img2)
    }
    if (question.image3 !== 'blank') {
        img3.src = question.image3
        src = document.getElementById("img3")
        src.appendChild(img3)
    }
    if (question.image4 !== 'blank') {
        img4.src = question.image4
        src = document.getElementById("img4")
        src.appendChild(img4)
    }
    
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    answerFlag=0
    img1.src=''
    img2.src=''
    img3.src=''
    img4.src=''
    src=0
    div.remove()
    divContainer.style.filter='none'
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    
    if (e.target.dataset.correct!=undefined && answerFlag==0){ 
        //console.log("poprawna odpowiedz")
        correctAnswerCount+=1
        answerFlag=1
    } else answerFlag=1
    answerCount.innerHTML='Poprawne odpowiedzi: '+correctAnswerCount+' / '+shuffledQuestions.length
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Koniec'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [{
        question: 'BIOTECHNOLOGIA:\nNiedawno świat obiegła smutna wiadomość o śmierci ostatniego samca białego nosorożca. Jaka dziedzina nauki może starać się dzięki technologii przywrócić do życia wymarłe gatunki zwierząt, oraz utrzymać zagrożone zagładą? ',
        image1: "blank",
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Biotechnologia',
                correct: true
            },
            {
                text: 'B. Nanotechnologia',
                correct: false
            },
            {
                text: 'C. Technologia żywności',
                correct: false
            }
        ],
        explanation: 'Poprawna odpowiedz to... A. Biotechnologia – to dziedzina nauki zajmująca się wykorzystaniem procesów biologicznych i żywych organizmów, lub ich składników, aby wytworzyć lub modyfikować produkty lub procesy w określonym celu. '
    },
    {
        question: 'ZOOTECHNOLOGIA:\nZaznacz gatunek zwierząt jaki może pojawić się w hodowli zwierząt gospodarskich. Czy wiesz, że do zwierząt gospodarskich możemy zaliczyć także pszczoły miodne?',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. kura',
                correct: true
            },
            {
                text: 'B. osa',
                correct: false
            },
            {
                text: 'C. daniel',
                correct: true
            },
            {
                text: 'D. niedźwiedź',
                correct: false
            },
            {
                text: 'E. bawół',
                correct: true
            }
        ],
        explanation: 'Poprawna odpowiedź to: A.Kura lub C. Daniel bądź E. Bawół. \nDo zwierząt gospodarskich zaliczamy np. drób, czyli: np. kury, kaczki, gęsi, strusie; owce; kozy; konie i osły; krowy i wszelkie bydło domowe, bawoły; zwierzęta futerkowe; świnie; jeleniowate i daniele – hodowane w warunkach fermowych'
    },
    {
        question: 'TECHNOLOGIA CHEMICZNA:\nZajmuje się także procesami produkcyjnymi, często opartymi o procesy chemiczne. A procesem chemicznym jest np. wyprodukowanie napoju gazowanego. Opiszę go, a wy wskażcie nazwę: oryginalna receptura zawierała enzym trawienny. Wprowadzono ją w 1898 roku jako napój leczniczy i nazwano od dwóch składników: enzymu pepsyny i orzechów koli. Jednak firma zbankrutowała, a nowy właściciel zmienił przepis tak, ze bardziej przypominał już to co i my znamy ze sklepowych półek. O jakim napoju mowa?',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Woda źródlana',
                correct: false
            },
            {
                text: 'B. Coca cola',
                correct: true
            },
            {
                text: 'C. Kubuś',
                correct: false
            }       
        ],
        explanation: 'Poprawna odpowiedz to...  B. Coca Cola. Tak, to o niej mowa.'
    },
    {
        question: 'PROJEKTOWANIE ARCHITEKTURY WNĘTRZ I OTOCZENIA:\nZ których materiałów można wykonać ścieżkę w ogrodzie? Czy wiesz, że do takiego celu można z powodzeniem użyć materiałów z recyklingu, jak na przykład: starych podkładów kolejowych, czy cegły rozbiórkowej? ',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Liście',
                correct: false
            },
            {
                text: 'B. Żwir, kamień, asfalt',
                correct: true
            },
            {
                text: 'C. Skóra zwierzęca',
                correct: false
            },
            {
                text: 'D. Drewniane paliki wbite na sztorc',
                correct: true
            }
        ],
        explanation: 'Poprawna odpowiedź to... D. Drewniane paliki wbite na sztorc lub B. Żwir, kamień, asfalt. Można też skorzystać z płyty chodnikowej, kostki betonowej i wielu innych...'
    },
    {
        question: 'KYNOLOGIA:\nKtóre rasy psów pochodzą z Polski?',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Owczarek niemiecki',
                correct: false
            },
            {
                text: 'B. Owczarek podhalański',
                correct: true
            },
            {
                text: 'C. Chihuahua',
                correct: false
            },
            {
                text: 'D. Mastif tybetański',
                correct: false
            }
        ],
        explanation: 'Poprawna odpowiedź to: B. Owczarek podhalański. Inne polskie rasy to między innymi chart polski, polski owczarek nizinny, ogar polski, gończy polski.'
    },
    {
        question: 'BUDOWNICTWO:\nBeton komórkowy swą nazwę wziął od:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Zawartych w sobie pęcherzyków gazu',
                correct: true
            },
            {
                text: 'B. Faktu, że sposób jego produkcji przesłano SMS’em',
                correct: false
            },
            {
                text: 'C. Sposobu produkcji – w małych, ciasnych i ciemnych komórkach',
                correct: false
            }
        ],
        explanation: 'Poprawna ddpowiedź to: A. Zawartych w sobie pęcherzyków gazu. Te pęcherzyki można do betonu wprowadzić przez reakcję chemiczną (najczęściej dodanie proszku aluminiowego – powstanie gazobeton), albo przez dodanie czynnika pianotwórczego (wprowadza pęcherzyki podczas mieszania – powstaje pianobeton)'
    },
    {
        question: 'EKONOMIA:\nCeny netto, to ceny:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. W sklepach NETTO',
                correct: false
            },
            {
                text: 'B. Bez naliczonego podatku od towarów i usług, czyli podatku VAT',
                correct: true
            },
            {
                text: 'C. Wyższe niż ceny BRUTTO',
                correct: false
            }           
        ],
        explanation: 'Poprawna odpowiedź to: B. Bez naliczonego podatku od towarów i usług, czyli podatku VAT. Cena NETTO, to cena bez dodatkowych podatków. Kiedy podatki są do ceny dodane – mamy cenę BRUTTO. Te ceny widzimy na półkach w sklepach. Co ciekawe, w USA sami musimy doliczyć podatki do ceny, którą widzimy w sklepie. I to inne w różnych stanach… Mamy też wagę NETTO (bez opakowania), BRUTTO (z opakowaniem) i TARA (samo opakowanie). '
    },
    {
        question: 'AUTOMATYKA I ROBOTYKA:\nWskaż do jakich celów można wykorzystywać roboty.',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Badania naukowe, do opieki',
                correct: false
            },
            {
                text: 'B. Cele szkoleniowe, przemysłowe, badawcze',
                correct: false
            },
            {
                text: 'C. Praca w nanoskali',
                correct: false
            },
            {
                text: 'D. Cele medyczne, militarne, rozrywkowe',
                correct: false
            },
            {
                text: 'E. Wszystkie odpowiedzi są prawidłowe',
                correct: true
            }
        ],
        explanation: 'Poprawna odpowiedź to E: Wszystkie odpowiedzi są prawidłowe. A może znasz jeszcze jakieś? :)'
    },
    {
        question: 'ELEKTROTECHNIKA:\nNazwa elektryczności wzięła się:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Od greckiego słowa „elektron” oznaczającego „bursztyn”',
                correct: true
            },
            {
                text: 'B. Od elektrycznych wyładowań atmosferycznych',
                correct: false
            },
            {
                text: 'C. Od ukochanej twórcy idei elektryczności Williama Gilberta – Elektry',
                correct: false
            }
        ],
        explanation: 'Poprawna odpowiedź to: A. Od greckiego słowa „elektron” oznaczającego „bursztyn”. Dlaczego od bursztynu? Spróbuj potrzeć nim o wełniany sweter i dotknąć małego skrawka papieru. Zobaczysz jak go przyciągnie. Tę zdolność – elektrostatyki - zaobserwowali starożytni Grecy. Zaś William Gilbert to faktycznie osoba, która pierwsza określiła różnice pomiędzy magnetyzmem i elektrycznością, które to pojęcie (wywiedzione od nazwy bursztynu) dało mu sławę. Był też pierwszym elektrotechnikiem. '
    },
    {
        question: 'TELEINFORMATYKA:\nW Chinach wydzielono specjalny pas na chodniku dla SMOMBIE – czyli smartfonowych zombie, ludzi uzależnionych od swoich telefonów. Jak myślisz jakie zagrożenia dla zdrowia niesie nadmierne korzystanie ze smartfona?  ',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Pogorszenie się wzroku i słuchu',
                correct: false
            },
            {
                text: 'B. Problemy z koncentracją',
                correct: false
            },
            {
                text: 'C. Otyłość',
                correct: false
            },
            {
                text: 'D. Wszystkie odpowiedzi są prawdziwe',
                correct: true
            }
        ],
        explanation: 'Poprawna odpowiedź to: D: Wszystkie odpowiedzi są prawdziwe. Smartfon oddziałuje na wiele naszych zmysłów. Jeśli słuchamy dużo głośnych dźwięków, zwłaszcza przez słuchawki, to pogorszy nam się słuch. Od patrzenia w światło ekranu osłabi się wzrok. Pojawią się też problemy z koncentracją i otyłością. Niestety to tylko początek, bo prawdziwe spustoszenie uzależnienie od smartfona przyniesie naszej psychice. Spowoduje odizolowanie się od najbliższych, brak właściwego kontaktu ze światem zewnętrznym, a w efekcie kłopot z życiem bez wirtualnej rzeczywistości…'
    },
    {
        question: 'INFORMATYKA:\nWskaż jak duży był pierwszy komputer:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. 140m2, czyli trochę mniej, niż boisko do siatkówki',
                correct: true
            },
            {
                text: 'B. 52m2, czyli wymiar klasy lekcyjnej',
                correct: false
            },
            {
                text: 'C. 2m2, czyli tyle, ile zajmuje klasyczne, pojedyncze łóżko',
                correct: false
            }      
        ],
        explanation: 'Poprawna odpowiedź to... A. 140m2, czyli trochę mniej, niż boisko do siatkówki. Naprawdę! Był prawie tak duży jak boisko do siatkówki. Zbudowano go w 1946 roku, a zaprezentowano publicznie w Walentynki – 14 lutego. Było to w USA, w Pensylwanii, na Uniwersytecie. Komputer ten ważył 27 ton… czyli tyle co 5 słoni. Czerpał też mnóstwo energii. I dał początek wszystkim otaczającym nas komputerom.'
    },
    {
        question: 'INFORMATYKA:\nNazwa GOOGLE powstała:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Od słowa „gogle”, bo widać w nich lepiej podczas śnieżycy',
                correct: false
            },
            {
                text: 'B. Od słowa „w ogóle”, bo można w ogóle nic nie wiedzieć, a i tak odpowiedź znajdzie się w wyszukiwarce',
                correct: false
            },
            {
                text: 'C. Od słowa „googol” oznaczającego dziesięć do potęgi setnej i była to pomyłka L.Page’a, twórcy Google.',
                correct: true
            }      
        ],
        explanation: 'Poprawna odpowiedź to... C. Od słowa „googol” oznaczającego dziesięć do potęgi setnej i była to pomyłka L.Page’a, twórcy Google. Choć trudno w to uwierzyć, GOOGLE powstało przypadkiem. Podobnie zresztą jak płatki śniadaniowe i wiele innych wynalazków. Pamiętaj: nie myli się tylko ten, kto niczego nie robi, a pomyłki czasem są najlepszym rozwiązaniem!'
    },
    {
        question: 'INFORMATYKA:\nZa pierwszego programistę i informatyka uznaje się Adę Augustę hrabinę Lovelace, matematyczkę i pisarkę, która już w 1842 roku zauważyła potencjał maszyny analitycznej Bobbage’a. Zapiski które poczyniła uznano za pierwszy program komputerowy. Czy wiesz, co nazwano jej imieniem?',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Wymyślono na jej cześć słowo "Adekwatnie"',
                correct: false
            },
            {
                text: 'B. Język programowania o nazwie Ada',
                correct: true
            }     
        ],
        explanation: 'Poprawna odpowiedź to... B. Imieniem ADA nazwano bardzo uniwersalny i zaawansowany język programowania. Jego powstanie spowodowało, że ilość języków używanych do programowania spadła z ponad 450 do 37 (w roku 1983), co znacznie ułatwiło rozwój tej dyscypliny nauki.'
    },
    {
        question: 'ENERGETYKA:\nJako Szczecin zapisaliśmy się w historii polskiej energetyki największą awarią energetyczną, czyli blackoutem. Było to 8 kwietnia 2008 roku i spowodowane było silnym wiatrem i olbrzymimi opadami mokrego śniegu. Najszybciej awarię usunięto w samym Szczecinie, zaś pozostałe miasta i wsie borykały się ze skutkami backoutu przez kilka dni. Jak myślisz ile osób pozbawionych było wtedy dostępu do prądu w aglomeracji szczecińskiej:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Ponad trzydzieści tysięcy mieszkańców',
                correct: false
            },
            {
                text: 'B. Ponad dwieście tysięcy mieszkańców',
                correct: false
            },
            {
                text: 'C. Ponad pół miliona mieszkańców',
                correct: true
            }      
        ],
        explanation: 'Poprawna odpowiedź to... C. ponad pół miliona mieszkańców odczuło skutki tej awarii. Czy wiesz jak można zabezpieczyć się przed takimi sytuacjami? Sprawdź czym jest agregat prądotórczy i jakie są alternatywne metody pozyskania energii.'
    },
    {
        question: 'TRANSPORT:\nTransportujemy także samochodami ciężarowymi. Opracowano nawet odrzutowy model takiego auta - Shockwave. Ma 36 000 koni mechanicznych, 6 kół i rozpędza się do:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. 300 km/h',
                correct: false
            },
            {
                text: 'B. 500 km/h',
                correct: false
            },
            {
                text: 'C. 600km/h',
                correct: true
            }      
        ],
        explanation: 'Poprawna odpowiedź to... C. Choć trudno w to uwierzyć to właściwa odpowiedź. Oczywiście owa prędkość jest efektem bardziej obliczeń niż prób. Wiadomo natomiast, że 500 m pokonuje w 8 sekund.'
    },
    {
        question: 'MECHATRONIKA:\nTa nieco dziwna nazwa łączy w sobie cztery składowe: mechanikę, elektronikę, oprogramowanie i sterowanie. Podaj trzy zastosowania efektów pracy mechatroników?',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Układy sterowania pojazdami, nowoczesne zabawki',
                correct: false
            },
            {
                text: 'B. Zaawansowane urządzenia i elektronikę użytkową',
                correct: false
            },
            {
                text: 'C. Roboty przemysłowe i urządzenia automatyki i robotyki',
                correct: false
            },
            {
                text: 'D. Aparaturę medyczną, narzędzia do nanopomiarów, mikroukłady elektromechaniczne',
                correct: false
            },
            {
                text: 'E. Wszystkie odpowiedzi są prawidłowe',
                correct: true
            }            
        ],
        explanation: 'Poprawna odpowiedź to... E. Wszystkie odpowiedzi są prawidłowe. Produkty mechatroniki powinny być wielofunkcyjne, łatwo konfigurowalne i elastyczne, adaptowalne i łatwe w obsłudze.'
    },
    
    {
        question: 'OCHRONA SRODOWISKA:\nWskaż, które produkty wyrzucone np. w lesie rozkładają się kolejno: 2 lata, 5 lat, 500 lat.',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Niedopałki papierosów, guma do żucia, plastikowa butelka',
                correct: true
            },
            {
                text: 'B. Styropianowa tacka do żywności, puszka, papierowa torba',
                correct: false
            },
            {
                text: 'C. Opakowanie po chipsach, zapalniczka, zapałki',
                correct: false
            }      
        ],
        explanation: 'Poprawna odpowiedź to: A... Troska o środowisko to także segregowanie śmieci i ich powtórne wykorzystywane. Każda szklana butelka wykorzystana ponownie pozwoli zaoszczędzić tyle energii ile potrzeba 100 watowej żarówce do świecenia przez 4 godziny. Jeśli wyrzucisz te rzeczy np. w lesie, to rozłożą się kolejno: 2 lata – niedopałki papierosów, 5 lat – guma do żucia, 500 lat – plastykowa butelka i styropianowa tacka do żywności.'
    },
    {
        question: 'ODNAWIALNE ŹRÓDŁA ENERGII:\nZaznacz odnawialne źródła Energii, czyli OZE.',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. źródła geotermalne',
                correct: false
            },
            {
                text: 'B. paliwa kopalne',
                correct: false
            },
            {
                text: 'C. energia wiatrowa',
                correct: false
            },
            {
                text: 'D. energia słoneczna',
                correct: false
            },
            {
                text: 'E. Wszystkie wyżej wymienione oprócz paliw kopalnych',
                correct: true
            },
                 
        ],
        explanation: 'Poprawna odpowiedź to: E. Wszystkie wyżej wymienione oprócz paliw kopalnych... Mamy pięć głównych odnawialnych źródeł energii: biomasy, geotermalne, wiatru, słoneczne i wodne. Ostatnie możemy podzielić na energie: pływów, mechaniczną wody i chemiczną wody, a także np. energię termiczną oceanów. A może Ty znajdziesz jeszcze inne źródło?'
    },
    {
        question: 'MIKROBIOLOGIA STOSOWANA:\nMedal Leeuwenhoeka przyznaje się za wybitny wkład w rozwój mikrobiologii. Przyznaje go od 1877 roku Holenderska Akademia Sztuk i Nauk. Jego nazwa pochodzi od nazwiska holenderskiego przedsiębiorcy i przyrodnika Antoniego van Leeuwenhoeka, który wynalazł:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Mikroskop',
                correct: true
            },
            {
                text: 'B. Lunetę do szczegółowej obserwacji księżyca',
                correct: false
            },
            {
                text: 'C. Naftalinę',
                correct: false
            },
            {
                text: 'D. Fiksantynę',
                correct: false
            }        
        ],
        explanation: 'Poprawna odpowiedź to: A.Mikroskop... Antoni van Leeuwenhoek wynalazł oczywiście mikroskop. Zajmował się początkowo kupiectwem i szlifowaniem szkieł. Nazywa się go ojcem mikrobiologii.'
    },
    {
        question: 'ICHTIOLOGIA:\nMało kto o tym wie, ale ryby mają zdolność zmiany płci. Jeśli w pobliżu brakuje osobników innej płci, natura broni ryby przed wyginięciem pozwalając na zmianę. To jednak nie wszystko! Ryba może sama zapłodnić swoje jaja będąc samcem zaraz po tym jak złożyła je jako samica. Takie zdolności mają głównie ryby morskie – w sumie 450 gatunków. Rekordzista zmiany płci może dziennie zmienić płeć:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. 6 razy',
                correct: false
            },
            {
                text: 'B. 20 razy',
                correct: true
            },
            {
                text: 'C. 60 razy',
                correct: false
            }      
        ],
        explanation: 'Poprawna odpowiedź to: B. 20. Ryba ta nosi nazwę Serranellus tortugarum.'
    },
    {
        question: 'OCHRONA ŚRODOWISKA:\nWskaż, które produkty wyrzucone np. w lesie rozkładają się kolejno: 2 lata, 5 lat, 500 lat.',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Niedopałki papierosów, guma do żucia, plastikowa butelka',
                correct: true
            },
            {
                text: 'B. Styropianowa tacka do żywności, puszka, papierowa torba',
                correct: false
            },
            {
                text: 'C. Opakowanie po chipsach, zapalniczka, zapałki',
                correct: false
            }      
        ],
        explanation: 'Poprawna odpowiedź to: A... Troska o środowisko to także segregowanie śmieci i ich powtórne wykorzystywane. Każda szklana butelka wykorzystana ponownie pozwoli zaoszczędzić tyle energii ile potrzeba 100 watowej żarówce do świecenia przez 4 godziny. Jeśli wyrzucisz te rzeczy np. w lesie, to rozłożą się kolejno: 2 lata – niedopałki papierosów, 5 lat – guma do żucia, 500 lat – plastykowa butelka i styropianowa tacka do żywności.'
    },
    {
        question: 'TECHNOLOGIA ŻYWNOSCI I ŻYWIENIE CZŁOWIEKA:\nZe względu na rolę w organizmie wyróżniamy trzy podstawowe grupy składników odżywczych zawartych w pokarmach. Są to: 1. białka i sole mineralne, 2. węglowodany i tłuszcze, oraz 3. witaminy i niektóre sole mineralne, błonnik. Połącz je w pary z nazwami grup: a. składniki budulcowe, b. składniki regulujące, c. składniki energetyczne.',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. 1.a. , 2.c. i 3.b',
                correct: true
            },
            {
                text: 'B. 1.c , 2.b i 3.a',
                correct: false
            },
            {
                text: 'C. 1.b , 2.c i 3.a',
                correct: false
            }      
        ],
        explanation: 'Poprawna odpowiedź to: A. 1.a. , 2.c. i 3.b. Pamiętaj, że tylko prawidłowo zbilansowana dieta pozwoli Tobie rosnąc zdrowo i dobrze się rozwijać. Musimy dostarczać organizmowi różnych produktów w formie potraw i napojów. Zapotrzebowanie jest różne w zależności od płci, wieku, rodzaju wykonywanej pracy, klimatu, czy stanu zdrowia.'
    },
    {
        question: 'BUDOWA JACHTÓW:\nZe Szczecinem wiąże się historia Umbriagi. Było to stworzenie, które było… żeglarzem. Żyło w Szczecinie w połowie XX wieku, więc mogą pamiętać je wasze babcie i wasi dziadkowie. Zaznacz którym zwierzęciem było to stworzenie.',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Pies',
                correct: false
            },
            {
                text: 'B. Kot',
                correct: true
            },
            {
                text: 'C. Koń',
                correct: false
            },
            {
                text: 'D. Bocian',
                correct: false
            }     
        ],
        explanation: 'Poprawna odpowiedź to: B. Kot... Umbriaga był kotem. Mieszkał na przystani Akademickiego Związku Morskiego (dziś to AZS Szczecin) i wyprawiał się stąd w rejsy na jachtach klubu. Na początku lat 50. Umbriaga zszedł z jachtu na wyspę Dębinę i tam zaginął bez śladu. Na pamiątkę jego imieniem nazwano kanał przy którym doszło do tego zdarzenia, a ziemię na którą zeskoczył – Ziemią Umbriagi. W 1975 roku pierwszy zakupiony przez AZS pełnomorski jacht typu Carter 30 nazwano także Umbriaga. O kocie śpiewa się szanty, napisano książkę i nazwano jego imieniem nagrodę. A jeśli kotu chcecie spojrzeć w jego kocie oczy – wystarczy udać się na Bulwary i tam pośród innych związanych z wodnym życiem naszego miasta pamiątek znaleźć pomnik Umbriagi. A! Nie zastanawiajcie się co oznacza jego imię. Nie znaczy nic. To zniekształcone słowo z włoskiego filmu granego w czasach życia Umbriagi w lokalnych kinach.'
    },
    {
        question: 'CHŁODNICTWO I KLIMATYZACJA:\nKlimatyzacja narodziła się w Stanach Zjednoczonych. Dziś trudno sobie wyobrazić upalne lato bez klimatyzowanych pomieszczeń. Klimatyzacje miewamy nawet w domach. Ale jest kilka dziedzin życia, które klimatyzacji zawdzięczają swój rozkwit, a nawet możliwość funkcjonowania. Są to:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Budowa drapaczy chmur, funkcjonowanie komputera',
                correct: false
            },
            {
                text: 'B. Pomoc alergikom poprzez oczyszczanie powietrza, przypisanie wakacji do lipca i sierpnia',
                correct: false
            },
            {
                text: 'C. Premiery w amerykańskich kinach podczas upałów, rozwój Houston, Las Vegas i Phoenix',
                correct: false
            },
            {
                text: 'D. Wszystkie odpowiedzi są prawidłowe',
                correct: true
            }     
        ],
        explanation: 'Poprawna odpowiedź to: D. Wszystkie odpowiedzi są prawidłowe. Wymienione amerykańskie miasta mogły rozwinąć się także dzięki klimatyzacji, bowiem inaczej byłoby w nich zbyt gorąco na pracę. Nie możliwe bez klimatyzacji byłoby też budowanie wieżowców – kondygnacje musiałby być wyższe, żeby powietrze cyrkulowało swobodnie, a klimatyzacja pozwala zredukować tę wysokość. Dzięki klimatyzacji alergicy mogą funkcjonować w oczyszczonym powietrzu, a komputer może schładzać procesor i długo funkcjonować. Wakacje przypadają na lipiec i sierpień i na szczęście nawet pomimo instalacji klimatyzacyjnych w szkołach tego nie zmieniono. Ciekawe jest natomiast jak klimatyzację wykorzystał przemysł filmowy: otóż na ciepły okres wyznaczano wiele premier, a ludzie chętnie przychodzili do klimatyzowanych sal kinowych, aby znaleźć tam odrobinę wytchnienia.'
    },
    {
        question: 'OCEANOTECHNIKA:\n pewnością słyszeliście o brytyjskich samochodach Rolls-Royce, albo szwedzkim VOLVO, czy też MAN. Czy wiecie, że firmy te oprócz znanych na świecie aut produkują też części statków? Która z części może być wspólna dla aut i statków?',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Maszt',
                correct: false
            },
            {
                text: 'B. Silnik',
                correct: true
            },
            {
                text: 'C. Żagiel',
                correct: false
            },   
        ],
        explanation: 'Poprawna odpowiedź to: B. Silnik... Obie marki produkują doskonałej jakości jednostki napędowe. Możecie więc swoim VOLVO, MANem, czy Rolls-Roycem przemierzać nie tylko drogi i bezdroża ale także jeziora, morza i oceany!'
    },
    {
        question: 'INŻYNIERIA CHEMICZNA I PROCESOWA:\n Ludzi wszechstronnie wykształconych nazywa się „ludźmi renesansu”. Posiadają oni rozległą wiedzę na różne tematy i swobodnie się w niej poruszają. Takimi inżynierami renesansu można nazwać pracowników inżynierii chemicznej i procesowej. Z jakich przedmiotów musieli być w szkole dobrzy, skoro w swojej pracy w praktyce projektują i prowadzą procesy: chemiczne, farmaceutyczne, spożywcze, petrochemiczne i kosmetyczne. Wytwarzają nowe produkty rynkowe i dopracowują procesy produkcji w fabrykach?',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Matematyka, fizyka, chemia fizyczna',
                correct: false
            },
            {
                text: 'B. Ekonomia, medycyna, biologia',
                correct: false
            },
            {
                text: 'C. Chemia i języki obce',
                correct: false
            },
            {
                text: 'D. Wszystkie odpowiedzi są prawidłowe',
                correct: true
            }   
        ],
        explanation: 'Poprawna odpowiedź to: D. Wszystkie odpowiedzi są prawidłowe. Podstawą ich pracy są: matematyka, fizyka, chemia fizyczna, ekonomia, medycyna, biologia i chemia. Warto też z pewnością znać dobrze języki obce, bowiem komunikacja z firmami spoza Polski jest tutaj bardzo ważna.'
    },
    {
        question: 'NANOTECHNOLGIA:\n Czyli świat w nano skali. Nano skala potrafi zmienić bardzo wiele. Dzięki nanorurkom udało się np. stworzyć najczarniejszą z dotychczasowych czerni. Udało się też zmienić temperaturę wrzenia wody:',
        image1: 'blank',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: 'A. Zamarza w temperaturze, w której powinna wrzeć',
                correct: true
            },
            {
                text: 'B. Wrze w temperaturze 20’C',
                correct: false
            },
            {
                text: 'C. Nie wrze wcale',
                correct: false
            },   
        ],
        explanation: 'Poprawna odpowiedź to: A. Zamarza w temperaturze, w której powinna wrzeć... Naukowcy byli mocno zdziwieni takim obrotem spraw, bowiem wcześniej myśleli, że nanoprzestrzeń może obniżać a nie podnosić temperaturę zamarzania wody. Samo doświadczenie również było trudne, bowiem nanorurki są materiałem hydrofobowym, co oznacza, że jest niezwilżalny przez wodę, jak np. rosa na powierzchni liścia, czy trawy (tworzy mokrą kulę).'
    }
]