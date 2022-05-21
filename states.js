import { sendMessage, sendPhoto, sendDice, sendDefaultMessage, getPhoto } from './index.js';

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
    }
]

const TEST_YES_BTN = "Это мне близко и понятно"
const TEST_NO_BTN = "Это мне не нравится"
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

function eventState(name) {
    return {
        name,
        action: async ctx => {
            const event = events[Math.floor(Math.random() * events.length)];

            await sendMessage({
                chat_id: ctx.chatId,
                text: event.text,
                reply_markup: { remove_keyboard: true }
            });

            await sendPhoto({
                chat_id: ctx.chatId,
                photo: getPhoto(event.img)
            });

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
                    text: "Привет.\n" +
                            "Я бот мобильного приложения Art & Freedom. Оно позволяет легко находить выставки современного искусства, которые подойдут именно тебе, а еще помогает найти компанию для похода на выставку. \n" +
                            "Пока мои неспешные разработчики готовят к выходу приложение, я в меру своих возможностей, проведу тебя через лабиринты современного искусства к событиям, которые всколыхнут твое сердечко. ",
                    reply_markup: keyboard("Найти компанию", "Выбрать событие")
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
                default:
                    return await sendDefaultMessage(ctx)
            }
        }
    },
    {
        name: "companion",
        action: async ctx => {
            await sendMessage({
                text: "companion",
                chat_id: ctx.chatId
            })
        },
        nextState: () => "start"
    },
    {
        name: "start-test",
        action: async ctx => {
            await sendMessage({
                text: "Мы знаем, что современное искусство бывает непонятным и сложным для восприятия. Но также оно позволяет быть порталом в мир личных чувств и переживаний. Ты совсем не обязан чувствовать, как все, когда соприкасаешься с ним. \n" +
                        "Искусство обучает внутренней свободе. Диалогу с собой. Помогает задавать себе неудобные вопросы. \n" +
                        "\n" +
                        "Чтобы мне было проще подобрать события, которые подойдут именно тебе, пожалуйста, пройди тест, выбирая картинки, которые тебе откликаются. Это наш прообраз искусственного интеллекта, который в мобильном приложении будет находить для тебя события еще точнее. \n" +
                        "\n" +
                        "«Ныряем в искусство?» ",
                chat_id: ctx.chatId,
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
                text: "Теперь я стал понимать тебя немного лучше и хочу предложить тебе некоторые события, которые в ближайшие дни будут проходить в Москве. Я предлагаю тебе градацию. Нажимая кнопку — точно да, ты увидишь три события, которые  скорее всего тебя порадуют. \n" +
                        "Нажимая кнопку — точно нет, ты увидишь события, которые могут разочаровать и еще можешь проверить мою работу, и посмотреть вдруг я ошибся.\n" +
                        "Нажимая кнопку — рискнуть, ты получишь рандомный список событий ",
                reply_markup: keyboard("Точно да", "Точно нет", "Рискнуть"),
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
                    await sendDice(ctx.chatId)
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
                reply_markup: keyboard("Да", "Нет, хочу другое", "Пройти тест заново")
            });
        },
        nextState: async (action, ctx) => {
            switch (action.message.text) {
                case "Да":
                    return "welcome";
                case "Нет, хочу другое":
                    return "event";
                case "Пройти тест заново":
                    ctx.user.testResult = "";
                    return "start-test";
                default:
                    return await sendDefaultMessage(ctx);
            }
        }
    }
];

export default states;
