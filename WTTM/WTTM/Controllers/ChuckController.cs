using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WTTM.Models;

namespace WTTM.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ChuckController : ControllerBase

    {
        private readonly ChuckDAL chuck = new ChuckDAL();
        [HttpGet("getrandomjoke")]
        public Task<ActionResult<ChuckJokes>> GetRandomJoke()
        {
            return chuck.GetRandomJoke();
        }

        [HttpGet("getjoke/{category}")]
        public Task<ActionResult<ChuckJokes>> GetJoke(string category)
        {
            return chuck.GetJoke(category);
        }
    }
}
