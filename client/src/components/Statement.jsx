import React, { useState, useEffect, useRef } from 'react';

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Statement = () => {


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-8 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                    Explanatory Statement
                </h1>
                <p className="text-lg sm:text-l md:text-xl text-gray-300 mb-12">
                    <b>Project ID</b>: 41545 <br />
                    <b>Project title</b>: Content-Driven Multimodal Deepfake Generation and Temporal Localization <br /><br />
                    <b>Chief Investigator</b>: Kalin Stefanov <br />
                    Department of Human-Centred Computing<br />
                    Phone: 0450847590<br />
                    Email: kalin.stefanov@monash.edu<br /><br />
                    <b>Student's Name</b>: Zhixi Cai <br />
                    Department of Human-Centred Computing<br />
                    Phone: 0432154888<br />
                    Email: zhixi.cai@monash.edu<br /><br />

                    You are invited to take part in this study. Please read this Explanatory Statement in full before deciding whether or not to participate in this research. If you would like further information regarding any aspect of this project, you are encouraged to contact the researchers via the phone numbers or email addresses listed above.
                    <br />This study is part of a student research project. <br />

                    <br /><b>What does the research involve?</b><br />
                    The aim of this study is: <br />
                    
                    •	To evaluate the performance of humans on the task of detection and temporal localisation of fake content in videos. <br />
                    •	To compare the average human performance on this task with the performance of a developed algorithm for automatic detection and temporal localisation of fake content in videos. <br />
                    <br />

                    You will be asked to watch 10 short videos, each with an approximate duration of 20 seconds. Some of the videos will contain one fake segment. Your goal will be to decide whether there is a fake segment in each video, and if so, mark the beginning and end of that fake segment. The study will take approximately 10 minutes to complete. At the end of the study, you will receive an aggregated score of your performance on the presented 10 videos. <br /><br />

                    This is a one-time participation invitation and there will be no follow-up interviews or surveys. The study will be carried out online and will not require face-to-face or virtual meetings. <br /><br />

                    We will not record any audio or video data. The study will capture only the answers to the above questions regarding the presented 10 videos. <br />



                    <br /><b>Why were you invited for this research?</b><br />
                    You are invited to participate in this study because of your connection to Monash University and the investigators. Therefore your contact details were obtained from the personal contacts of one of the investigators. <br />
                    <br /><b>Consenting to participate in the project and withdrawing from the research</b><br />
                    The consent process for this study involves signing and returning a consent form. Your participation in this study is voluntary and you have the right to withdraw from participation in the study at any stage during the study without any direct or indirect implications. In case you decide to withdraw during the study, all data associated with your responses will be deleted immediately. However, after the completion of the study (i.e., submitting all responses), it will not be possible to withdraw your data. <br /><br />
                    <br /><b>Possible benefits and risks to participants </b><br />
                    This research aims to create an automatic system for localisation of fake content in videos. Such a system is highly beneficial for society, for example, we can use it for analysis of videos on the Internet and prevent the spread of misinformation. The study can also help with improving your skills in spotting fake content next time you browse the Internet. <br /><br />

                    You will be asked to watch videos and answer the above questions regarding those videos. The videos do not include any disturbing content. We believe that the study could cause a very low level of inconvenience stemming from the task of sitting in a chair and watching videos on a computer screen. <br /><br />

                    There are no foreseeable risks of harm or side effects to you. <br />

                    <br /><b>Confidentiality</b><br />
                    After the completion of the study, your data will be anonymised and will be used only in aggregated form together with data collected from other participants. Any publication (e.g., conference papers, journal articles, reports and theses) describing results from this study will also present only findings on patterns in this aggregated and de-identified data. Since the gift certificates are being paid from a Monash University fund, your contact details will need to be released to Monash Finance. <br />
                    <br /><b>Storage of data</b><br />
                    Your data will be stored on secure Monash computers or drives and will be kept for a minimum of 5 years after completion of the project. Only the investigators listed in this project will have access to the anonymised data. After that period, all data will be destroyed. <br />
                    <br /><b>Results</b><br />
                    The results of this study will be published as part of conference papers, journal articles, reports, or theses. The results will be based on aggregated and de-identified data collected during the study. <br />
                    <br /><b>Complaints</b><br />
                    Should you have any concerns or complaints about the conduct of the project, you are welcome to contact the Executive Officer, Monash University Human Research Ethics Committee (MUHREC): <br />
                    <br />Executive Officer <br />

                    Monash University Human Research Ethics Committee (MUHREC) <br />

                    Room 111, Chancellery Building D, <br />

                    26 Sports Walk, Clayton Campus <br />

                    Research Office <br />

                    Monash University VIC 3800 <br />

                    <b>Tel</b>: +61 3 9905 2052, <b>Email</b>: muhrec@monash.edu, <b>Fax</b>: +61 3 9905 3831

                    <br /> <br />
                    Thank you, <br />
                    Dr Kalin Stefanov
                </p>
                <div className="flex justify-center">
                    <a
                        href="/consent"
                        className="inline-block bg-gray-700 text-white rounded-lg px-8 py-4 text-lg font-medium transition duration-300 hover:bg-gray-900"
                    >
                        Continue
                    </a>


                </div>
            </div>
        </div>
    );
};

export default Statement;
