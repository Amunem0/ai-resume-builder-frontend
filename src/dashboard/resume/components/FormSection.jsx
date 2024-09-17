import React, { useState } from "react";
import PersonalDetail from "./form/PersonalDetail";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  HomeIcon,
  LayoutGrid,
} from "lucide-react";
import Summary from "./form/Summary";
import Experience from "./form/Experience";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const {resumeId}=useParams();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor/>
        </div>
      
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}

          {/* {activeFormIndex <= 4 && ( */}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            {" "}
            Next
            <ArrowRight />{" "}
          </Button>
          {/* )} */}
        </div>
      </div>
      {/* Personal Details */}
      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Summary */}
      {activeFormIndex == 2 ? (
        <Summary enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Professional Experience */}
      {activeFormIndex == 3 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Educational */}
      {activeFormIndex == 4 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Skills */}
      {activeFormIndex == 5 ? (
        <Skills enabledNext={(v) => setEnableNext(v)} />
      ) : null}

      {activeFormIndex == 6 ? (
        <Navigate to={'/my-resume/'+resumeId+"/view"}/>
      ) : null}
    </div>
  );
}

export default FormSection;
