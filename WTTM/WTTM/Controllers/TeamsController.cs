using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using WTTM.Models;

namespace WTTM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        //private readonly WTTM_DBContext _context;
        private readonly ChuckDAL chuck = new ChuckDAL();
       
        private HttpClient GetHttpClient()
        {
            var client = new HttpClient();
            return client;
        }

        [HttpGet("getteams")]

        public async Task<ActionResult<List<Teams>>> GetTeams()
        {

            var client = GetHttpClient();
            var request = await client.GetAsync($"/get/teams");
            var response = await request.Content.ReadAsAsync<List<Teams>>();
            return response;
        }

        //TO DO: Make new team?

        //TO DO: Update team name
        [HttpPut("{id}")] //api endpoint
        public async Task<ActionResult> UpDateTeamName(int id, Teams teams) 
        {
            if(ModelState.IsValid || id != teams.TeamId) 
            {
                return BadRequest();
            }
            else 
            {
                Teams dbTeams =
                //replace the values of the field here

                    await
            }

        }

        //TO DO: Update team points
    }
}
