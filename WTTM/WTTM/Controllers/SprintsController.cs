using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WTTM.Models;

namespace WTTM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SprintsController : ControllerBase
    {
        WTTM_DBContext _context = new WTTM_DBContext();

        #region Create
        [HttpPost("createsprint")]
        public async Task<ActionResult<Sprints>> CreateSprint(Sprints sprint)
        {
            _context.Sprints.Add(sprint);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSprintsById), new { id = sprint.SprintId }, sprint);
        }
        #endregion

        #region Read
        [HttpGet("getsprints")]
        public async Task<ActionResult<List<Sprints>>> GetSprints()
        {
            var sprints = await _context.Sprints.ToListAsync();
            if (sprints == null)
            {
                return NoContent();
            }
            else
            {
                return sprints;
            }
        }

        [HttpGet("getsprintsbyid/{id}")]
        public async Task<ActionResult<Sprints>> GetSprintsById(int id)
        {
            var sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null)
            {
                return NotFound();
            }
            else
            {
                return sprint;
            }
        }

        [HttpGet("getsprintsbyteamid/{id}")]
        public async Task<List<Sprints>> GetSprintsByTeamId(int id)
        {
            var sprints = await _context.Sprints.ToListAsync();
            List<Sprints> teamSprints = new List<Sprints>();

            foreach (var item in sprints)
            {
                if (item.TeamId == id)
                {
                    teamSprints.Add(item);
                }
            }

            if (teamSprints == null || teamSprints.Count == 0)
            {
                return null;
            }
            else
            {
                return teamSprints;
            }
        }

        [HttpGet("getincompletedsprints")]
        public async Task<ActionResult<List<Sprints>>> GetIncompletedSprints()
        {
            var sprints = await _context.Sprints.ToListAsync();
            var incompletedSprints = new List<Sprints>();
            foreach (var item in sprints)
            {
                if (!item.IsCompleted)
                {
                    incompletedSprints.Add(item);
                }
            }
            if (incompletedSprints == null)
            {
                return NotFound();
            }
            else
            {
                return incompletedSprints;
            }
        }
        #endregion

        #region Update
        [HttpPut("updatesprint/{id}")]
        public async Task<ActionResult> UpdateSprint(int id, Sprints sprint)
        {
            if (id != sprint.SprintId || !ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                Sprints updatedSprint = _context.Sprints.Find(id);
                updatedSprint.TeamId = sprint.TeamId;
                updatedSprint.TotalStoryPoints = sprint.TotalStoryPoints;
                updatedSprint.SprintStatus = sprint.SprintStatus;
                updatedSprint.IsCompleted = sprint.IsCompleted;

                _context.Entry(updatedSprint).State = EntityState.Modified;
                _context.Update(updatedSprint);
                await _context.SaveChangesAsync();
                return NoContent();
            }

        }
        #endregion

        #region Delete
        [HttpDelete("deletesprint/{id}")]
        public async Task<ActionResult> DeleteSprint(int id)
        {
            var sprint = await _context.Sprints.FindAsync(id);
            if (sprint == null)
            {
                return NotFound();
            }
            else
            {
                sprint.TeamId = null;
                _context.Sprints.Remove(sprint);
                await _context.SaveChangesAsync();
                return NoContent();

            }
        }
        #endregion
    }
}
