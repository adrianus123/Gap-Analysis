using FluentValidation;
using TestVox.Server.Data;

namespace TestVox.Server.Validator
{
    public class OrganizerValidator : AbstractValidator<OrganizerRequest>
    {
        public OrganizerValidator()
        {
            RuleFor(request => request.organizerName).NotNull().NotEmpty();
            RuleFor(request => request.imageLocation).NotNull().NotEmpty();
        }
    }
}
