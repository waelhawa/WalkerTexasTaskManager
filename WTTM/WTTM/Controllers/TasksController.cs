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
    public class TasksController : ControllerBase
    {
        WTTM_DBContext _context = new WTTM_DBContext();
        #region Create
        [HttpPost("createtask")]
        public async Task<ActionResult<Tasks>> CreateTask(Tasks task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTasksById), new { id = task.TaskId }, task);
        }
        #endregion


        #region Update
        [HttpPut("updatetask/{id}")]
        public async Task<ActionResult> UpdateTask(int id, Tasks task)
        {
            if (id != task.TaskId || !ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                Tasks updatedTask = _context.Tasks.Find(id);
                updatedTask.SprintId = task.SprintId;
                updatedTask.UserId = task.UserId;
                updatedTask.ShortDesc = task.ShortDesc;
                updatedTask.FullDesc = task.FullDesc;
                updatedTask.StoryPoint = task.StoryPoint;
                updatedTask.TaskStatus = task.TaskStatus;

                _context.Entry(updatedTask).State = EntityState.Modified;
                _context.Update(updatedTask);
                await _context.SaveChangesAsync();
                return NoContent();
            }

        }
        #endregion

        #region Delete
        [HttpDelete("deletetask/{id}")]
        public async Task<ActionResult> DeleteTask (int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            else
            {
                task.UserId = null;
                task.SprintId = null;
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
                return NoContent();

            }
        }
        #endregion
    }
}
