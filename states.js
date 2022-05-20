import { sendMessage, sendPhoto, sendDice, sendDefaultMessage, getPhoto } from './index.js';

function keyboard(...keys) {
    return { keyboard: [[...keys]] };
}

function inlineKeyboard(...keys) {
    return { inline_keyboard: [[...keys]] };
}

const TEST_YES_BTN = "Это мне близко и понятно"
const TEST_NO_BTN = "Это мне не нравится"
const TEST_KEYS = keyboard(TEST_YES_BTN, TEST_NO_BTN);
function testState(name, img, nextState) {
    return {
        name,
        action: ctx => {
            sendPhoto({
                chat_id: ctx.chatId,
                photo: getPhoto(img),
                caption: "Как вам это?",
                reply_markup: TEST_KEYS
            });
        },
        nextState: (action, ctx) => {
            switch (action.message?.text) {
                case TEST_YES_BTN:
                    ctx.user.testResult += "Y";
                    return nextState;
                
                case TEST_NO_BTN:
                    ctx.user.testResult += "N";
                    return nextState;
                default:
                    return sendDefaultMessage(ctx);
            }
        }
    };
}

function eventState(name, text) {
    return {
        name,
        action: ctx => {
            sendMessage({
                chat_id: ctx.chatId,
                text,
                reply_markup: { remove_keyboard: true }
            });

            sendPhoto({
                chat_id: ctx.chatId,
                photo: getPhoto("event.jpg"),
                reply_markup: inlineKeyboard({text: "Перейти на сайт", url: "https://www.afisha.ru/"})                
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
        action: (ctx) => {
            ctx.user.event = -1;
            ctx.user.testResult = "";

            sendMessage(
                {
                    chat_id: ctx.chatId,
                    text: "Привет.\n" +
                            "Я бот мобильного приложения Art & Freedom. Оно позволяет легко находить выставки современного искусства, которые подойдут именно тебе, а еще помогает найти компанию для похода на выставку. \n" +
                            "Пока мои неспешные разработчики готовят к выходу приложение, я в меру своих возможностей, проведу тебя через лабиринты современного искусства к событиям, которые всколыхнут твое сердечко. ",
                    reply_markup: keyboard("Найти компанию", "Выбрать событие")
                }
            );
        },
        nextState: (action, ctx) => {
            switch (action.message.text) {
                case "Найти компанию": 
                    return "companion"
                case "Выбрать событие":
                    if (ctx.user.testResult === '') return 'start-test'
                    else return 'event'
                default:
                    return sendDefaultMessage(ctx)
            }
        }
    },
    {
        name: "companion",
        action: ctx => {
            sendMessage({
                text: "companion",
                chat_id: ctx.chatId
            })
        },
        nextState: () => "start"
    },
    {
        name: "start-test",
        action: ctx => {
            sendMessage({
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
        nextState: (action, ctx) => {
            switch (action.message.text) {
                case "Да":
                    return "test-block-1"
                case "Нет":
                    return "welcome"
                default:
                    return sendDefaultMessage(ctx)
            }
        }
    },
    testState("test-block-1", "test_1.jpg", "test-block-2"),
    testState("test-block-2", "test_2.jpg", "test-block-3"),
    testState("test-block-3", "test_3.jpg", "test-block-4"),
    testState("test-block-4", "test_4.jpg", "event"),
    {
        name: "event",
        action: ctx => {
            sendMessage({
                text: "Теперь я стал понимать тебя немного лучше и хочу предложить тебе некоторые события, которые в ближайшие дни будут проходить в Москве. Я предлагаю тебе градацию. Нажимая кнопку — точно да, ты увидишь три события, которые  скорее всего тебя порадуют. \n" +
                        "Нажимая кнопку — точно нет, ты увидишь события, которые могут разочаровать и еще можешь проверить мою работу, и посмотреть вдруг я ошибся.\n" +
                        "Нажимая кнопку — рискнуть, ты получишь рандомный список событий ",
                reply_markup: keyboard("Точно да", "Точно нет", "Рискнуть"),
                chat_id: ctx.chatId
            });
        },
        nextState: (action, ctx) => {
            switch (action.message.text) {
                case "Точно да":
                    return "good-event";
                case "Точно нет":
                    return "bad-event";
                case "Рискнуть":
                    sendDice(ctx.chatId)
                    return "random-event";
                default: 
                    return sendDefaultMessage(ctx);
            }
        }
    },
    eventState('good-event', 'Поздравляем вам досталось - полет на воздушном шаре над Питером'),
    eventState('bad-event', 'Поздравляем вам досталось - один час кормления голубей на крестовском'),
    eventState('random-event', 'Поздравляем вам досталось - мастер класс по таксидермии'),
    {
        name: "restart",
        action: ctx => {
            sendMessage({
                chat_id: ctx.chatId,
                text: "Подходит?",
                reply_markup: keyboard("Да", "Нет, хочу другое", "Пройти тест заново")
            });
        },
        nextState: (action, ctx) => {
            switch (action.message.text) {
                case "Да":
                    return "welcome";
                case "Нет, хочу другое":
                    return "event";
                case "Пройти тест заново":
                    ctx.user.testResult = "";
                    return "start-test";
                default:
                    return sendDefaultMessage(ctx);
            }
        }
    }
];

export default states;
