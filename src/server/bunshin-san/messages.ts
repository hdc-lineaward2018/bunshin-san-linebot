import { FlexMessage } from "@line/bot-sdk";
import { User } from "./models";

export const generateGeneralMenu = (state?: User) : FlexMessage => {
  return {
    type: 'flex',
    altText: '指令の書',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '指令の書'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: 'すべての巻物を見る',
              data: '{"command": "showBooks"}',
              displayText: 'すべての巻物を見る'
            }
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '現在の巻物を見る',
              data: '{"command": "showCurrentBook"}',
              displayText: '現在の巻物を見る'
            }
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '新しい巻物',
              data: '{"command": "createBook"}',
              displayText: '新しい巻物'
            }
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '次の章',
              data: '{"command": "newSection"}',
              displayText: '次の章'
            }
          }
        ]
      }
    }
  }
}
