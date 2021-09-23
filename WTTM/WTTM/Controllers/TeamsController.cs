using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using WTTM.Models;
using Microsoft.EntityFrameworkCore;

namespace WTTM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        WTTM_DBContext _context = new WTTM_DBContext();

        #region Create
        [HttpPost("createnewteam")]
        public async Task<ActionResult<Teams>> CreateTeams(Teams teams)
        {
            _context.Teams.Add(teams);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTeamsById), new { id = teams.TeamId }, teams);
        }
        #endregion


        #region Update
        [HttpPut("updateteam/{id}")]
        public async Task<ActionResult> UpdateTeam(int id, Teams teams)
        {
            if (id != teams.TeamId || !ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                Teams updatedTeam = _context.Teams.Find(id);

                updatedTeam.TeamId = teams.TeamId;
                updatedTeam.TeamName = teams.TeamName;
                updatedTeam.TeamPoints = teams.TeamPoints;
                updatedTeam.Sprints = teams.Sprints;
                updatedTeam.AspNetUsers = teams.AspNetUsers;


                _context.Entry(updatedTeam).State = EntityState.Modified;
                _context.Update(updatedTeam);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }
        #endregion

        #region Delete
        [HttpDelete("deleteteam/{id}")]
        public async Task<ActionResult> DeleteTeams(int id)
        {
            var teams = await _context.Teams.FindAsync(id);
            if (teams == null)
            {
                return NotFound();
            }
            else
            {
                teams.TeamName = null;
                _context.Teams.Remove(teams);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }
        #endregion

        #region Read

        [HttpGet("getteams")]
        public async Task<ActionResult<List<Teams>>> GetTeams()
        {
            var teams = await _context.Teams.ToListAsync();
            return teams;
        }

        [HttpGet("getteamsbyid/{id}")]
        public async Task<ActionResult<Teams>> GetTeamsById(int id)
        {
            var teams = await _context.Teams.FindAsync(id);
            if (teams == null)
            {
                return NotFound();
            }
            else
            {
                return teams;
            }
        }

        //[HttpGet("getteamsbyuserid/{id}")]
        //public async Task<ActionResult<Teams>> GetTeamsByUserId(string id)
        //{
        //    var teams = await _context.AspNetUsers.ToListAsync();
        //    var team = new Teams();
        //    foreach (AspNetUsers item in teams)
        //    {
        //        if (item.Id == id)
        //        {
        //            team? = GetTeamsById(item.TeamId);
        //        }
        //    }
        //}
        #endregion







    }
}
