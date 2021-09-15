using ChuckAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;



namespace ChuckAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private HttpClient GetHttpClient() 
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://api.chucknorris.io/");
            return client;
        }

        [HttpGet("getteams")]

        public async Task<ActionResult<List<Teams>>> GetTeams()
        {

            var client = GetHttpClient();
            var request = await client.GetAsync($"/get/teams");
            var response = await request.Content.ReadAsAsync<Teams>();
            return response;//missing syntax for grabbing a list of teams
        }


    }
}
