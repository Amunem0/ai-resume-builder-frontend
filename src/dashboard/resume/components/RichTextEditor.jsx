import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInforContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { AIChatSession } from "./../../../../service/AIModel";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const PROMPTPOS =
  'position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const GeneratePosSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
  
    setLoading(true);
  
    const prompt = PROMPTPOS.replace('{positionTitle}', resumeInfo.experience[index].title);
    const result = await AIChatSession.sendMessage(prompt);
  
    // Extract response text
    const resp = result.response.text();
  
    // Parse the response JSON
    let parsedResp;
    try {
      parsedResp = JSON.parse(resp);
    } catch (error) {
      toast('Failed to parse AI response');
      setLoading(false);
      return;
    }
  
    // Check if experience is defined and an array
    const experiences = Array.isArray(parsedResp.experience)
      ? parsedResp.experience
          .map(item => item.replace(/<li>|<\/li>/g, '')) // Remove HTML tags
          .map(item => `• ${item}`) // Add bullet points
          .join('\n') // Join with new line
      : 'No experience found';
  
    // Set the formatted text
    setValue(experiences);
    setLoading(false);
  };
  

  return (
    <div>
      <div className="flex justify-between my-2 items-end">
        <label className="text-xs ">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
          onClick={GeneratePosSummaryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate From AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
