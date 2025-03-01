import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import axiosInstanse from '../../../axiousInstance'
import { About, Education, Footer, Hero, Project, Skills } from '.'
import Navbar from './Navbar'
import { pre } from 'framer-motion/client'
import { all } from 'axios'
import { Button } from 'antd'
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


    const { data: allData, isLoading } = useQuery({
        queryKey: ["allData"],
        queryFn: async () => {
            const response = await axiosInstanse.get('/product/getData')
            return response.data.data[0]
        }
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



    return (
        <div className='bg-black' >
            {allData &&

                <>
                    <div className='bg-black overflow-x:hidden text-white px-10 max-sm:px-5'>
                        <Navbar nameFirst={allData.name} />
                        <Hero name={name} profession={profession} setName={setName} setProfession={setProfession} />
                        <About about={about} onAboutChange={handleAboutChange} />


                        <Education education={education} onEducationChange={handleEducationChange} />
                        <Skills skills={skills} setSkills={handleSkillChange}/>
                        <Project project={project} setProject={handleProjectAdd} />
                        {/* <SectionSettingsModal/> */}
                        <div className='fixed bottom-5 sm:right-[45%] max-sm:left-[100px]'>
                            <Button type='primary' className='w-[150px] p-5' onClick={getUpdatedFields}>Save</Button>
                        </div>



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