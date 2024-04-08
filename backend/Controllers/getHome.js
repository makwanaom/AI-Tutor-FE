function getHome(req,res){
    console.log("Root endpoint");
    res.send("Root Endpoint");
    return;
}
export default getHome;