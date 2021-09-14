using ChuckAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ChuckAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuckController : ControllerBase
    {
        private HttpClient GetHttpClient()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://api.chucknorris.io/");
            return client;
        }
        [HttpGet("getrandomjoke")]
        public async Task<ActionResult<ChuckJokes>> GetRandomJoke()
        {
            var client = GetHttpClient();
            var request = await client.GetAsync("/jokes/random");
            var response = await request.Content.ReadAsAsync<ChuckJokes>();
            return response;
        }

        [HttpGet("getjoke/{category}")]
        public async Task<ActionResult<ChuckJokes>> GetJoke(string category)
        {
            var client = GetHttpClient();
            var request = await client.GetAsync($"/jokes/random?category={category}");
            var response = await request.Content.ReadAsAsync<ChuckJokes>();
            return response;
        }
    }
}
