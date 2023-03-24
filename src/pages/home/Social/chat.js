import React, { useEffect, useState } from 'react';
import { WechatOutlined, CloseOutlined, WhatsAppOutlined, PaperClipOutlined } from '@ant-design/icons';
import { LoadingOutlined, MehOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import "../Social/chat.scss";
import SvgLogo from '../../../logo';
import Picker from 'emoji-picker-react';



function Chat() {

  const [isExist, setIsExist] = useState(false);
  const [chatContent, setChatContent] = useState('');
  const [ArrayUserTexts, setArrayUserTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPickerAppear, setIsPickerAppear] = useState(false);


  const showChatBox = () => {
    setIsExist(true);
  }

  const closeChatBox = () => {
    setIsExist(false);
  }

  const goToWhatsapp = () => {
    window.location = "https://www.whatsapp.com/android/";
  }


  const handleSubmit = event => {
    event.preventDefault();
    setArrayUserTexts(prev => [...prev, chatContent]);
    setChatContent('');

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);


  }



  const peakerAppear = () => {
    !isPickerAppear ?
      setIsPickerAppear(true) : setIsPickerAppear(false);
  }

  

  const onEmojiClick = (event, emojiObject) => {

    setChatContent(prev => prev + emojiObject.emoji); 

  };





  return (
    <>

      {isExist &&
        <div className='chatBox'>

          <div className="chatHeader">
            <p className="logoChat">
              <SvgLogo />

            </p>
            <p className='titleChat'>  Vous avez des questions ?  </p> <br />
            <p className='littleTitleChat'> Discute avec nous !</p>
            <CloseOutlined className='cancel' onClick={() => closeChatBox()} />
          </div>

          <div className="chatBody">

            <div className="robotUnswer">
              <p className='robotUnswer-content'>   Bonjour! comment puis-je vous aider.  </p>
            </div>
            <br />

            {isPickerAppear &&
              <div className="Emojies">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            }


            <ul>
              {ArrayUserTexts.map((text) =>

                <p className='userText-content'> &#160;   &#160;
                  {text}
                  
                  
                </p>

              )}
            </ul>

          </div>

          <div className="chatFooter">

            <form onSubmit={handleSubmit}>
              <input type="text" placeholder='   Composez votre message... '
                className='inputChat'
                onChange={(e) => { setChatContent(e.target.value) }}
                value={chatContent } 
                  
              />
              <PaperClipOutlined style={{ fontSize: '20px', color: '#20384D', marginRight: '12px' }} />
              <MehOutlined style={{ fontSize: '20px', color: '#20384D', cursor: 'pointer' }} className='SmilePeaker'
                onClick={() => { peakerAppear() }}
              />

            </form>

          </div>

        </div>
      }

      {!isExist &&

        <WechatOutlined className='chat-icon' onClick={() => showChatBox()} />
      }


      <WhatsAppOutlined className='chat-whtsp' onClick={() => goToWhatsapp()} />

      <div>





      </div>
    </>


  )
}

export default Chat; 