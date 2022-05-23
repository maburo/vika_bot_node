import { sendMessage, sendPhoto, sendDice, sendDefaultMessage, getPhoto, createChatInviteLink } from './index.js';

function keyboard(...keys) {
    return { keyboard: [[...keys]], resize_keyboard: true };
}

function inlineKeyboard(...keys) {
    return { inline_keyboard: [[...keys]] };
}

const events = [
    {
        img: 'event_1.jpg',
        text: 'Собрание приключений клоуна-мудреца Славы Полунина. \n' +
        'Интерактивное пространство, где можно оказаться в декорациях пустыни или побороться со снежной бурей, погрузиться в детство Славы, побыть клоуном, посетить Академию Дураков и услышать лекции настоящих академиков. \n' +
        '\n' + 
        'Атмосфера выставки позволяет не бояться показаться смешным или нелепым. \n' + 
        'Предлагает помечтать так же безгранично, как это умеют делать дети. \n' +
        '\n' +
        '18 мая по 3 июля в московском Манеже \n' +
        'https://afisha.yandex.ru/moscow/art/zia-vozdushnye-zamki-slavy-polunina?source=search-page&schedule-date=2022-06-07'
    },
    {
        img: 'event_2.jpg',
        text: 'Куратор выставки, Павел Пепперштейн, – публицист и знаменитый российский художник. Он снимал кино, писал книги и картины. А еще изобрел новый жанр в искусстве – “психоделический реализм”. Реалистичные формы, объекты он наполнял галлюциногенным содержанием. Жанр отразился и в его визуальных работах, и в двухтомном романе “Мифогенная любовь каст”. В истории о путешествии парторга в магическом лесу во время ВОВ.\n' +
        'Выставка “Грезы о молоке” – первая попытка «пространственной экранизации» этого романа. Экспозиция напоминает коллекцию артефактов, связанных со съемками. А сами произведения искусства – кинодекорации психоделического леса. \n' +
        '\n' +
        'До 26 июня в центре Вознесенского \n' +
        'https://clck.ru/hUcUA'
    },
    {
        img: 'event_3.jpg',
        text: 'Представьте альтернативную вселенную с трансформирующейся реальностью. А в ней – обычную чашку. Сейчас она стоит перед вами. Через секунду может переместиться на метр в сторону, а может не переместиться. Но в любом случае вы воспримите это так же естественно, как дуновение ветра. \n' +
        '"Историческая экспозиция мира Морфоза" – коллекция\n' +
        'результатов подобных изменений. Целый блок визуальных материалов посвящен тому, как жители мира адаптировались к последствиям катастрофы, научились жить в новых условиях постоянной непостоянности и даже извлекать из этого пользу.\n' +
        '\n' +
        'До 26 июня в ММОМА\n' +
        'https://clck.ru/hUuo5'
    },
    {
        img: 'event_4.jpg',
        text: 'О феномене отчуждения, одном из ключевых культурных мифов XX века, решили поговорить родоначальник московского концептуализма Андрей Монастырский и культуролог Иосиф Бакштейн. Из их разговора стало ясно: создав работу, художник моментально от неё отчуждается. Но с этим тезисом согласны не все. Например, у художников послевоенного периода и современных авторов другой взгляд на вопрос. Ольга Турчина заметила разнообразие позиций и объединила их под крышей одной экспозиции. \n' +
        '\n' +
        'До 31 июля в ММОМА \n' +
        'https://clck.ru/eMZ6a'
    },
    {
        img: 'event_5.jpg',
        text: 'Цивилизационный перекрёсток – лучшая метафора для описания той точки, в которой сейчас находится человечество. Порассуждать о распутье ценностей, взглядов и возможных сценариях нашего будущего художники решили в рамках выставки "Стоя на перекрестке".\n' +
        'С помощью видеоинсталляций и картин художники помогут вам представить будущее цивилизации через погружение в прошлое и ответить себе на актуальные вопросы об экологии и роли искусственного интеллекта в творческом процессе человека.\n' +
        '\n' +
        'До 6 июня в ЦТИ Фабрика\n' +
        'https://clck.ru/hUu6R'
    },
    {
        img: 'event_6.jpg',
        text: '«Живёшь лишь однажды»\n' +
        '\n' +
        'Современное искусство в шлеме виртуальной реальности. \n' +
        'Как это, не просто смотреть на картину, а оказаться внутри фантазии художника? \n' +
        'Как далеко можно отлететь в исследовании своих эмоций, если этот художник Иеронима Босх и его картина «Сад наслаждений».\n' +
        'Двигаясь в пространстве триптиха, вы «прочитаете» целую историю, последовательно проходя через наполненные кодами и многочисленными символами Рай, Сад распутства и Ад. \n' +
        '\n' +
        'Центр МАРС  до 31 мая \n' +
        'https://afisha.yandex.ru/moscow/art/places/tsentr-mars'
    },
    {
        img: 'event_7.jpg',
        text: 'Уникальные шахматы, модель автомобиля «Белка» или оригинальные проекты интерьеров, мебели и осветительных приборов для редакции газеты «Правда». Поиск нового языка для предметов быта, которые отражают свое время. Все это в спокойном режиме можно изучать на выставке - История российского дизайна. Избранное. 1917–2022.\n' +
        'Отлично подойдет, если вы хотите вдумчивого созерцания или внезапного вдохновения. \n' +
        '\n' +
        'До 25 ноября в Новой Третьяковке\n' +
        '\n' +
        'https://afisha.yandex.ru/moscow/art/istoriia-rossiiskogo-dizaina-izbrannoe-1917-2022?source=rubric'
    },
    {
        img: 'event_8.jpg',
        text: 'В фокусе внимания оказалась тема художественной формы в самом широком ее понимании. В мировом искусстве XX века ясно прослеживается тенденция к попытке ухода от привычных образов — предметных и антропоморфных изображений. В первую очередь, разложение и обобщение понятных образов связаны в культуре с социально-политическими переменами, потрясениями и трагедиями прошлого века. Этот путь переживания находил совершенно разные формы выражения в творчестве авторов — от движения к абстрактному искусству, в котором образы видоизменяются до простых геометрических форм, до полного уничтожения предметного мира как такового в пользу господства цвета или пространства.\n' + 
        '\n ' + 
        'До 7 августа в ММСИ на Петровке (https://afisha.yandex.ru/moscow/art/places/moskovskii-muzei-sovremennogo-iskusstva-na-petrovke)\n ' + 
        '\n ' + 
        'https://afisha.yandex.ru/moscow/art/prostye-formy?source=rubric'
    },
    {
        img: 'event_9.jpg',
        text: 
        'Выставка для тех, кто ловит себя на мысли:” Стоит поменьше сидеть в телефоне”. \n' +
        'Мэт Коллишоу с опорой на науку исследует, как современные технологии меняют наше мироощущение, манипулируя сознанием и программируя наши действия. Через оптические иллюзии и подвижные скульптуры Мэт Коллишоу исследует человеческий феномен привыкания\n' +
        'Механические скелеты птиц, зоотроп с колибри и другие работы вовлекут своей изящностью и метафоричностью в рассуждения о значении цифрового симулякра мира…\n' +
        '\n' +
        'до 25.06 в галерее Гари Татинцяна https://clck.ru/hUcUa'
    },
    {
        img: 'event_10.jpg',
        text: 
        'Научно-эксперементальный проект прямо на крыше Дарвиновского музея.\n' +
        '«Москва. Среда обитания» предполагает исследование и переосмысление городской среды как специфической материи, являющейся необходимым условием и важным обстоятельством жизни всех живых существ в Мегаполисе. \n' +
        'Экспозиция состоит из объектов живописи, граффити, уличного искусства, каллиграфии, скульптур и инсталляций. \n' +
        '\n' +
        'до  11 сентября в Дарвинвском музее\n' +
        'https://afisha.yandex.ru/moscow/art/moskva-sreda-obitaniia?source=rubric'
    }
]

const TEST_YES_BTN = "Красивое, это мне близко"
const TEST_NO_BTN = "Кажется, мне не нравится"
const TEST_KEYS = keyboard(TEST_YES_BTN, TEST_NO_BTN);
function testState(name, img, nextState) {
    return {
        name,
        action: async ctx => {
            sendPhoto({
                chat_id: ctx.chatId,
                photo: getPhoto(img),
                caption: "Как вам это?",
                reply_markup: TEST_KEYS
            });
        },
        nextState: async (action, ctx) => {
            switch (action.message?.text) {
                case TEST_YES_BTN:
                    ctx.user.testResult += "Y";
                    return nextState;
                
                case TEST_NO_BTN:
                    ctx.user.testResult += "N";
                    return nextState;
                default:
                    return await sendDefaultMessage(ctx);
            }
        }
    };
}

function getEventIds() {
    const ids = new Set();
    
    while (ids.size < 3) {
        const id = Math.floor(Math.random() * events.length);
        if (ids.has(id)) continue;
        else ids.add(id);
    }

    console.log(ids);

    return [...ids].map(id => events[id]);
}

function eventState(name) {
    return {
        name,
        action: async ctx => {
            for (const event of getEventIds()) {
                await sendPhoto({
                    chat_id: ctx.chatId,
                    photo: getPhoto(event.img)
                });
    
                await sendMessage({
                    chat_id: ctx.chatId,
                    disable_web_page_preview: true,
                    text: event.text,
                    reply_markup: { remove_keyboard: true }
                });
            }

            return "restart"
        },
        nextState: () => "restart"
    }
}

const states = [
    {
        name: "start",
        nextState: () => "welcome",
    },
    {
        name: "welcome",
        action: async (ctx) => {
            ctx.user.event = -1;
            ctx.user.testResult = "";

            await sendMessage(
                {
                    chat_id: ctx.chatId,
                    disable_web_page_preview: true,
                    parse_mode: 'markdown',
                    text: 
                    'Привет.\n' +
                    'Я бот мобильного приложения *Art & Freedom*. \n' +
                    'Оно позволяет легко находить выставки современного искусства, которые подходят именно тебе, а еще помогает найти компанию, если тебе одиноко. \n' +
                    '\n' +
                    'Пока мои неспешные разработчики готовят к выходу приложение, я в меру своих возможностей, проведу тебя через лабиринты современного искусства к событиям, которые всколыхнут твое сердечко.',
                    reply_markup: keyboard(
                        "Найти компанию", 
                        "Выбрать событие", 
                        // "send link",
                        // {text: 'Контакт', request_contact: true}
                    ),
                }
            );
        },
        nextState: async (action, ctx) => {
            switch (action.message.text) {
                case "Найти компанию": 
                    return "companion"
                case "Выбрать событие":
                    if (ctx.user.testResult === '') return 'start-test'
                    else return 'event'
                // case "send link":
                //     createChatInviteLink(ctx);
                //     return "event"
                default:
                    return await sendDefaultMessage(ctx)
            }
        }
    },
    {
        name: "companion",
        action: async ctx => {
            const user = findCompany(ctx);
            if (!user) {
                await sendMessage({
                    text: "Похоже тут нет никого кроме тебя 😔",
                    disable_web_page_preview: true,
                    chat_id: ctx.chatId
                })
            }
            else {
                await sendMessage({
                    text: `Мы нашли для вас пару - это @${user.username}`,                    
                    disable_web_page_preview: true,
                    chat_id: ctx.chatId
                })
            }
            
        },
        nextState: () => "start"
    },
    {
        name: "start-test",
        action: async ctx => {
            await sendMessage({
                text: 
                'Мы знаем, что современное искусство бывает непонятным и сложным для восприятия. \n' +
                'Также оно может стать для тебя порталом в мир личных открытий и переживаний. Ты совсем не обязан чувствовать, как все, когда соприкасаешься с ним. \n' +
                'Искусство обучает внутренней свободе. Диалогу с собой. Помогает задавать неудобные вопросы. \n' +
                '\n' +
                'Чтобы мне было проще подобрать события, которые подойдут тебе, пожалуйста, *пройди тест*. Выбери картинки, которые тебе откликаются. Это наш прообраз искусственного интеллекта, который в мобильном приложении будет находить для тебя события еще точнее. \n' +
                '\n' +
                'Ныряем в искусство? \n',
                chat_id: ctx.chatId,
                parse_mode: 'markdown',
                disable_web_page_preview: true,
                reply_markup: keyboard("Да", "Нет")
            })

            null
        },
        nextState: async (action, ctx) => {
            switch (action.message.text) {
                case "Да":
                    return "test-block-1"
                case "Нет":
                    return "welcome"
                default:
                    return await sendDefaultMessage(ctx)
            }
        }
    },
    testState("test-block-1", "test_1.jpg", "test-block-2"),
    testState("test-block-2", "test_2.jpg", "test-block-3"),
    testState("test-block-3", "test_3.jpg", "test-block-4"),
    testState("test-block-4", "test_4.jpg", "event"),
    {
        name: "event",
        action: async ctx => {
            await sendMessage({
                text: 
                'Получилось!\n' +
                'Теперь я стал понимать тебя немного лучше и хочу предложить некоторые события, которые в ближайшие дни будут проходить в Москве. \n' +
                'Я предлагаю тебе такую градацию. \n' +
                'Нажимая кнопку — *точно да*, ты увидишь три события, которые  скорее всего тебя порадуют. \n' +
                'Нажимая кнопку — *точно нет*, ты увидишь события, которые могут разочаровать. Кстати, можешь проверить мою работу, и посмотреть вдруг я ошибся.\n' +
                'Нажимая кнопку — *рискнуть*, ты получишь рандомный список событий.',
                reply_markup: keyboard("Точно да", "Точно нет", "Рискнуть"),
                parse_mode: 'markdown',
                disable_web_page_preview: true,
                chat_id: ctx.chatId
            });
        },
        nextState: async (action, ctx) => {
            switch (action.message.text) {
                case "Точно да":
                    return "good-event";
                case "Точно нет":
                    return "bad-event";
                case "Рискнуть":
                    // await sendDice(ctx.chatId)
                    return "random-event";
                default: 
                    return await sendDefaultMessage(ctx);
            }
        }
    },
    eventState('good-event'),
    eventState('bad-event'),
    eventState('random-event'),
    {
        name: "restart",
        action: async ctx => {
            await sendMessage({
                chat_id: ctx.chatId,
                text: "Подходит?",
                disable_web_page_preview: true,
                reply_markup: keyboard("Да", "Нет, хочу другое", "Найти компанию")
            });
        },
        nextState: async (action, ctx) => {
            switch (action.message.text) {
                case "Да":
                    return "finish";
                case "Нет, хочу другое":
                    return "random-event";
                case "Найти компанию":
                    return "companion";
                default:
                    return await sendDefaultMessage(ctx);
            }
        }
    },
    {
        name: 'finish',
        action: async ctx => {
            await sendMessage({
                chat_id: ctx.chatId,
                disable_web_page_preview: true,
                text: 
                'Я рад, что помог тебе найти событие, которое тебя вдохновит. \n' +
                'Еще ты можешь поискать себе компанию на выставку или посмотреть наш манифест, в котором мы рассказываем, для чего вообще задумали это приложение. \n' +
                '\n' +
                'Собеседник выбирается случайным образом из пользователей бота, тебе останется просто написать человеку — *Привет, пойдем на выставку*)\n' +
                'Чтобы все заработало, мне нужно, чтобы в поле твоих контактов был ещё и никнейм - это выглядит примерно так @vsudusvet',
                parse_mode: 'markdown',
                reply_markup: keyboard('Найти компанию', 'Манифест')
            })
        },
        nextState: async (action, ctx) => {
            switch (action.message.text) {
                case "Манифест":
                    return "manifest";
                case "Найти компанию":
                    return "companion";
                default:
                    return await sendDefaultMessage(ctx);
            }
        }
    },
    {
        name: 'manifest',
        action: async ctx => {
            await sendPhoto({
                chat_id: ctx.chatId,
                photo: getPhoto('manifest.jpg'),
                reply_markup: { remove_keyboard: true }
            });
        },
        nextState: async (action, ctx) => {
            return 'welcome'
        }
    }
];

export default states;
