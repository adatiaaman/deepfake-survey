import React, { useState, useEffect, useRef } from 'react';

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import ConsentFormHumanEthics from '../ConsentFormHumanEthics.pdf';

const Consent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { signup, login } = useAuth();
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [signature, setSignature] = useState(null);
    const signatureRef = useRef(null);

    const [detectDeepfakes, setDetectDeepfakes] = useState(false);
    const [useInPapers, setUseInPapers] = useState(false);

    const handleSignatureChange = () => {
        setSignature(signatureRef.current.toDataURL());
    };

    const handleClearSignature = () => {
        signatureRef.current.clear();
        setSignature(null);
    };

    const handleDetectDeepfakesChange = () => {
        setDetectDeepfakes(!detectDeepfakes);
    };
    const handleUseInPapersChange = () => {
        setUseInPapers(!useInPapers);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (signature === null) {
            setError('Please provide your signature.');
            return;
        }
        if (password !== confPassword) {
            return setError('Passwords do not match');
        }
        else {
            setIsLoading(true);
            try {
                setError('');
                localStorage.setItem('currentVideoIndex', 0);

                // Assuming your signup function takes name, email, and password as arguments
                const checker = await signup(email, name, signature);
                console.log('ch', checker);

                if (checker == -1) {
                    setError('Survey already filled.');
                }
                else {
                    // notifySuccess("Account created successfully");
                    console.log('111');
                    await login(email, "123456");
                    navigate('/survey'); // '/consent'
                }

            } catch {
                setError('Failed to create an account');
            }
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-8 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                    Consent Form
                </h1>
                <p className="text-lg sm:text-l md:text-xl text-gray-300 mb-12">
                    <b>Project ID</b>: 41545 <br />
                    <b>Project title</b>: Content-Driven Multimodal Deepfake Generation and Temporal Localization <br />
                    <b>Chief Investigator</b>: Kalin Stefanov <br /><br />
                    I have been asked to take part in the Monash University research project specified above.
                    I have read and understood the Explanatory Statement and I hereby consent to participate in this project.
                </p>

                <table className="table-fixed w-full mb-8">
                    <thead>
                        <tr>
                            <th className="text-lg sm:text-l md:text-xl text-gray-300 mb-12">I consent to the following:</th>
                            <th className="text-lg sm:text-l md:text-xl text-gray-300 mb-12">Agree</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-lg sm:text-l md:text-xl text-gray-300 mb-12'>Use of my anonymised responses to analyse the human ability to detect deepfakes.</td>
                            <td className="text-center">
                                <input
                                    type="checkbox"
                                    name="detectDeepfakes"
                                    checked={detectDeepfakes}
                                    onChange={handleDetectDeepfakesChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='text-lg sm:text-l md:text-xl text-gray-300 mb-12'>Use of my anonymised responses as part of papers, articles, reports, or thesis.</td>
                            <td className="text-center">
                                <input
                                    type="checkbox"
                                    name="useInPapers"
                                    checked={useInPapers}
                                    onChange={handleUseInPapersChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className="text-lg sm:text-m md:text-l text-red-300 mb-12">
                    *It is necessary to agree to consent messages to proceed.
                </p>

                {/* <a className='bg-gray-700 text-white rounded-lg px-4 py-2 text-lg font-medium mb-6' href={ConsentFormHumanEthics} target="_blank"
                    rel="noreferrer">
                    View Original Consent Form
                </a> */}

                {/* <br></br>
                <br></br> */}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="text-lg sm:text-l md:text-xl text-gray-300 mb-12">
                            Email (Monash):
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="text-lg sm:text-l md:text-xl text-gray-300 mb-12">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="signature" className="text-lg sm:text-l md:text-xl text-gray-300 mb-12">
                            Signature:
                        </label>
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{ className: 'w-full h-48 bg-gray-500 rounded-md' }}
                            onEnd={handleSignatureChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={handleClearSignature}
                            className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2"
                        >
                            Clear Signature
                        </button>
                    </div>

                    <div className='flex justify-center mb-6'>
                        <a className='bg-gray-700 text-white rounded-lg px-4 py-2 text-lg font-medium mb-6' href={ConsentFormHumanEthics} target="_blank"
                            rel="noreferrer">
                            View Original Consent Form
                        </a>
                    </div>

                    <div className="flex justify-center mb-6">

                        <button
                            type="submit"
                            className={`inline-block bg-gray-700 text-white rounded-lg px-8 py-4 text-lg font-medium transition duration-300 ${detectDeepfakes && useInPapers && signature ? 'hover:bg-gray-900' : 'cursor-not-allowed opacity-50'
                                }`}
                            disabled={!detectDeepfakes || !useInPapers || signature === null}
                        >
                            Begin
                        </button>
                    </div>
                </form>

                {/* <div className="flex justify-center">
                    <a
                        href="/survey"
                        className={`inline-block bg-gray-700 text-white rounded-lg px-8 py-4 text-lg font-medium transition duration-300 ${detectDeepfakes && useInPapers ? 'hover:bg-gray-900' : 'cursor-not-allowed opacity-50'
                            }`}
                        disabled={!detectDeepfakes || !useInPapers}
                    >
                        Begin
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default Consent;
