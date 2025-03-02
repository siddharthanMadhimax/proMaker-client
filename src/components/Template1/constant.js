const _exports={}

const username=localStorage.getItem("name")
_exports.navbars=[
    {link:"#home",name:"Home"},
    {link:"#about",name:"About"},
    {link:"#education",name:"Education"},
    {link:"#skills",name:"Skills"},
    {link:"#projects",name:"Projects"}
]


_exports.templates=[
    {name:"Template1",link:`/${username}/template1`},
    {name:"Temaplte2",link:`/${username}/template2`}
]

export default _exports