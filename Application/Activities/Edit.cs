/*using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;

namespace Application
{
    public class Edit
    {
        public class Command: IRequest 
        {
            public Activity Activity {get;set;}
        }
        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.Activity).SetValidator(new AbstractValidator());
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                
                //activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity, activity);               

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}*/
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
    public class Edit
    {
        public class Command: IRequest <Result<Unit>>
        {
            public Activity Activity {get;set;}
        } 
        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                
                if (activity==null)
                    return null;

                //activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity, activity);               

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update this activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
