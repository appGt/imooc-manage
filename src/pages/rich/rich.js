import React from 'react'
import { Button, Card, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'

export default class RichText extends React.Component {
  state = {
    showRichText: false,
    editorContent: '',
    editorState: '',
  }

  onHandleClear = () => {
    this.setState({
      editorState: ''
    })
  }

  onHandleGetHtml = () => {
    this.setState({
      showRichText: true
    })
  }

  onEditorChange = (contentState) => {
    this.setState({
      contentState,
    })
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Card>
          <Button onClick={this.onHandleClear}>清空</Button>
          <Button onClick={this.onHandleGetHtml}>获取Html文本</Button>
        </Card>
        <Card title="富文本编辑器" style={{ marginTop: 10 }}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="内容"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}>
          {
            <div dangerouslySetInnerHTML={{ __html: draftjs(this.state.contentState) }}>

            </div>
          }
        </Modal>
      </div >
    )
  }
}