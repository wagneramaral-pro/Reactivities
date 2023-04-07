using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Activities;
using Application;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;

        }
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {            
            return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity Activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = Activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id,Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {    
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }        
    }
}