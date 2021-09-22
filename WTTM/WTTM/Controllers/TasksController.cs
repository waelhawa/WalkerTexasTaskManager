using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            //Tasks newTask = new Tasks();
            //newTask.SprintId = task.SprintId;
            //newTask.UserId = task.UserId;
            //newTask.DateCreated = task.DateCreated;
            //newTask.ShortDesc = task.ShortDesc;
            //newTask.FullDesc = task.FullDesc;
            //newTask.StoryPoint = task.StoryPoint;
            //newTask.IsCompleted = task.IsCompleted;
            //newTask.TaskStatus = task.TaskStatus;
            //newTask.DateCompleted = task.DateCompleted;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTasksById), new { id = task.TaskId }, task);
        }
        #endregion

        #region Read
        [HttpGet("gettasks")]
        public async Task<ActionResult<List<Tasks>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            if (tasks == null)
            {
                return NoContent();
            }
            else
            {
                return tasks;

            }
        }
        [HttpGet("gettasksbyid/{id}")]
        public async Task<ActionResult<Tasks>> GetTasksById(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            else
            {
                return task;
            }
        }
        [HttpGet("gettasksbysprintid/{id}")]
        public async Task<ActionResult<List<Tasks>>> GetTasksBySprintId(int id)
        {
            var tasks = await _context.Tasks.ToListAsync();
            var tasksBySprint = new List<Tasks>();
            foreach (var item in tasks)
            {
                if (item.SprintId == id)
                {
                    tasksBySprint.Add(item);
                }
            }

            if (tasksBySprint == null)
            {
                return NotFound();
            }
            else
            {
                return tasksBySprint;
            }

        }

        [HttpGet("getunassignedtasksinsprint/{id}")]
        public async Task<ActionResult<List<Tasks>>> GetUnassignedTasksIsSprint(int id)
        {
            var sprintTasks = await GetTasksBySprintId(id);
            var userTasks = new List<Tasks>();
            foreach (Tasks task in sprintTasks.Value)
            {
                if (task.UserId == null)
                {
                    userTasks.Add(task);
                }
            }

            if (userTasks == null)
            {
                return NotFound();
            }
            else
            {
                return userTasks;
            }
        }

        [HttpGet("gettasksbyuserid/{id}")]
        public async Task<ActionResult<List<Tasks>>> GetTasksBySprintId(string id)
        {
            var tasks = await _context.Tasks.ToListAsync();
            var tasksByUser = new List<Tasks>();
            foreach (var item in tasks)
            {
                if (item.UserId == id)
                {
                    tasksByUser.Add(item);
                }
            }

            if (tasksByUser == null)
            {
                return NotFound();
            }
            else
            {
                return tasksByUser;
            }

        }

        [HttpGet("getincompletedtasks")]
        public async Task<ActionResult<List<Tasks>>> GetIncompletedTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            var incompletedTasks = new List<Tasks>();
            foreach (var item in tasks)
            {
                if (!item.IsCompleted)
                {
                    incompletedTasks.Add(item);
                }
            }
            if (incompletedTasks == null)
            {
                return NotFound();
            }
            else
            {
                return incompletedTasks;
            }
        }

        [HttpGet("getunassignedtasks")]
        public async Task<ActionResult<List<Tasks>>> GetUnassignedTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            var unassignedTasks = new List<Tasks>();
            foreach (var item in tasks)
            {
                if (item.SprintId == null)
                {
                    unassignedTasks.Add(item);
                }
            }

            if (unassignedTasks == null)
            {
                return NotFound();
            }
            else
            {
                return unassignedTasks;
            }
        }

        [HttpGet("getunassignedtasks/{id}")]
        public async Task<ActionResult<List<Tasks>>> GetUnassignedTasks(int id)
        {
            var tasks = await _context.Tasks.ToListAsync();
            var unassignedTasks = new List<Tasks>();
            foreach (var item in tasks)
            {
                if (item.SprintId == id && item.UserId == null)
                {
                    unassignedTasks.Add(item);
                }
            }

            if (unassignedTasks == null)
            {
                return NotFound();
            }
            else
            {
                return unassignedTasks;
            }
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
                updatedTask.IsCompleted = task.IsCompleted;

                _context.Entry(updatedTask).State = EntityState.Modified;
                _context.Update(updatedTask);
                await _context.SaveChangesAsync();
                return NoContent();
            }

        }
        #endregion

        #region Delete
        [HttpDelete("deletetask/{id}")]
        public async Task<ActionResult> DeleteTask(int id)
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
