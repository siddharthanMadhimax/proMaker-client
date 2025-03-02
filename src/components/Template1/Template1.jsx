    import React, { useState } from 'react'
    import { useQuery } from '@tanstack/react-query'
    import { useEffect } from 'react'
    import axiosInstanse from '../../../axiousInstance'
    import { About, Education, Footer, Hero, Project, Skills } from '.'
    import Navbar from './Navbar'
    import { pre, tr } from 'framer-motion/client'
    import { all } from 'axios'
    import { Button, Modal } from 'antd'
    import EditComponent from './EditComponent'
    import SectionSettingsModal from './EditComponent'

    const Template1 = () => {
        const [userData, setUserData] = useState()
        const [name, setName] = useState("")
        const [profession, setProfession] = useState('')
        const [about, setAbout] = useState([])
        const [education, setEducation] = useState([])
        const [contacts, setContacts] = useState()
        const [skills, setSkills] = useState([])
        const [project, setProject] = useState([])
        const [generateModel,setGenerateModel]=useState(false)
        const [generateBtn,setGenerateBtn]=useState(false)
        const username=localStorage.getItem("name")
        console.log("generate btn",generateBtn)
        const { data: allData, isLoading } = useQuery({
            queryKey: ["allData"],
            queryFn: async () => {
                console.log("username da",username)
                const response = await axiosInstanse.get(`/product/getData/${username}`);
                return response.data.data[0]; 
            },
            enabled: !!username,
            refetchOnWindowFocus: false,
        })

        useEffect(() => {
            if (!allData) return
            console.log("all data", allData)
            setUserData(allData)
            setName(allData && allData.name)
            setProfession(allData && allData.proffesion)
            setAbout(allData && allData.aboutMe || [])
            setEducation(allData && allData.education)
            setContacts(allData && allData.contacts)
            setSkills(allData && allData.skills)
            setProject(allData && allData.projects)
            setGenerateBtn(allData && allData.generate)
            console.log('name da', project)
        }, [allData])

        const handleAboutChange = (index, key, value) => {
            console.log(key)
            setAbout(prevAbout => {
                const updatedAbout = [...prevAbout]
                updatedAbout[index] = { ...prevAbout[index], [key]: value }
                return updatedAbout
            })
        }

        const handleEducationChange = (index, key, value) => {
            setEducation(prev => {
                const updatedEducation = [...prev]
                updatedEducation[index] = { ...prev[index], [key]: value }
                return updatedEducation
            })
        }

        const handleProjectAdd = (index, projectType, value) => {
            setProject((prev) => {
                const updatedProject = [...prev]
                updatedProject[index] = { ...prev[index], [projectType]: value }
                return updatedProject
            })
        }

        const handleSkillChange=(index,type,value)=>{
            setSkills((prev)=>{
                const updatedSkills=[...prev]
                updatedSkills[index]={...prev[index],[type]:value}
                return updatedSkills
            })
        }
    

        const getUpdatedFields = async () => {
            const updateCheck = {}
            if (allData && allData.name != name) updateCheck.name = name
            if (allData && allData.profession != profession) updateCheck.proffesion = profession
            if(allData && JSON.stringify(allData.aboutMe)!==JSON.stringify(about)) updateCheck.aboutMe=about
            if(allData && JSON.stringify(allData.projects)!==JSON.stringify(project)) updateCheck.projects=project
            if(allData && JSON.stringify(allData.education) !==JSON.stringify(education)) updateCheck.education=education
            if(allData && JSON.stringify(allData.skills) !== JSON.stringify(skills)) updateCheck.skills=skills

            const response = await axiosInstanse.post("product/update/allChanged/data", updateCheck)
            console.log("res", response)
        }

        const handleGenerate=async()=>{
            
            setGenerateModel(false)
            const response=await axiosInstanse.post("product/setGenerate")
            if(response.data.success){
                setGenerateBtn(true)
            }
        }

        return (
            <div className='bg-black' >
                {allData &&

                    <>
                    <Modal
                    className='generatemodel'
                    open={generateModel}
                    closable={false}
                    footer={false}
                    onCancel={()=>setGenerateModel(false)}>
                        <div className='flex flex-col items-center gap-10'>
                            <p>Are you Ready to Generate</p>
                            <div className='flex gap-10'>
                                <Button className='w-[100px] bg-green-400' onClick={handleGenerate}>Yes</Button>
                                <Button className='w-[100px] bg-red-400' onClick={()=>setGenerateModel(false)}>No</Button>
                            </div>
                        </div>
                    </Modal>
                        <div className='bg-black  overflow-x:hidden text-white px-10 max-sm:px-5'>
                        {
                            generateBtn ? "": <div className='fixed z-[999] top-5 sm:left-[550px] left-[90px]'>
                            <Button onClick={()=>setGenerateModel(true)} className='sm:w-[200px] w-[150px] p-5 generate-btn'>Generate</Button>
                        </div>
                        }
                            <Navbar nameFirst={allData.name}  />
                            <Hero name={name} profession={profession} generate={generateBtn} setName={setName} setProfession={setProfession} />
                            <About about={about} onAboutChange={handleAboutChange} generate={generateBtn} />


                            <Education education={education} onEducationChange={handleEducationChange} generate={generateBtn} />
                            <Skills skills={skills} setSkills={handleSkillChange} generate={generateBtn}/>
                            <Project project={project} setProject={handleProjectAdd} generate={generateBtn} />
                            {/* <EditComponent/> */}
                            {/* <SectionSettingsModal/> */}
                            {
                                generateBtn ? "" :<div className='fixed bottom-5 sm:right-[45%] max-sm:left-[100px]'>
                                <Button type='primary' className='w-[150px] p-5' onClick={getUpdatedFields}>Save</Button>
                            </div>
                            }



                        </div>
                        {
                            allData && <Footer contacts={contacts} />
                        }

                    </>
                }

            </div>
        )
    }

    export default Template1