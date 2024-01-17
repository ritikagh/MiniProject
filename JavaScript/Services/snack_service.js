

class SnacksService
{   
    static url = "http://localhost:3000/snacks";


    static async getSnacksDetails()
    {
       
        return await axios.get(this.url);
    }


}
export default SnacksService;