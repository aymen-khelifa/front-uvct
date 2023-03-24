import React, {useState} from 'react'
import './course-videos.scss'
import {Button, Typography} from "antd";
import {CircleOutlined, CheckCircle, ChevronLeft, ChevronRight} from "@mui/icons-material";
import RichTextEditor from 'react-rte';

// The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
// Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
// Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS',],
    INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'}
    ],
    BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
    ]
};

export const CourseVideos = () => {
    const [editorState, setEditorState] = useState(() =>
        RichTextEditor.createEmptyValue(),
    );
    const [selectedVideo, setSelectedVideo] = useState({sectionIndex: 0, videoIndex: 0})

  return(
      <div className={'course-videos'}>
        <div className={'left-section'}>
            {
                Object.keys(sidebarScaffold).map((topic, topicIndex)=> {
                    return(
                        <div>
                            <Typography className={'topic'}>{topic}</Typography>
                            {
                                sidebarScaffold[topic].map((subject, index)=> {
                                    return(
                                        <div onClick={()=> {
                                            setSelectedVideo({
                                                sectionIndex: topicIndex,
                                                videoIndex: index
                                            })
                                        }} className={`flex-row align-items-center pointer p-l-24 ${selectedVideo.videoIndex === index && selectedVideo.sectionIndex === topicIndex ?'selected-video': ''}`}>
                                            {topicIndex === 0 ?<CheckCircle style={{fontSize: 13, marginRight: 9, color: '#10B981'}}/>: <CircleOutlined style={{fontSize: 13, marginRight: 9, color: '#334155'}}/>}
                                            <Typography className={'subject'}>{subject}</Typography>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    )
                })
            }
        </div>
        <div className={'right-section'}>
            <Typography className={'course-section-title'}>Fonctions ressources humaines</Typography>
            <video autoPlay controls className={'video'} src={'https://media.istockphoto.com/videos/african-american-business-holding-invisible-object-video-id473385319'}/>
            <div className={'flex-row space-between align-items-center'}>
                <Button className={'navigation-button'} icon={<ChevronLeft />}>Précédent</Button>
                <Button className={'navigation-button'}>Suivant <ChevronRight style={{textAlign: "right"}}/></Button>
            </div>
            <Typography className={'questions'}>Des questions?</Typography>
            <RichTextEditor
                value={editorState}
                onChange={setEditorState}
                toolbarConfig={toolbarConfig}
            />
            <Button className={'submit-button'}>Envoyer</Button>
        </div>
      </div>
  )
}


const sidebarScaffold = {
    'Introduction aux ressources humaines': ['Introduction aux ressources humaines', "Quel est le système en RH", 'L\'histoire des ressources humaines'],
    'Fonctions ressources humaines': ['Fonctions ressources humaines', "Fonctions des ressources humaines 2 - L...", 'Fonctions Ressources Humaines 3- Recru...', 'Fonctions Ressources Humaines 4- Forma...', 'Fonctions des ressources humaines 5- Sy...', 'Synthèse des fonctions ressources humaiaines'],
    'Objectifs et stratégies des ressources humaines': ['ressources humaines au niveau mondial', "Stratégie des ressources humaines", 'Objectifs des ressources humaines'],
    'Analyse de travail': ['Analyse de travail', "Analyse de poste 2", 'Avantages de l\'analyse de poste'],
    'Recrutement': ['Recrutement', "Recrutement au niveau mondial", 'Sources de recrutement', 'Sources de recrutement 2'],
}
