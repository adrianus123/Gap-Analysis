using FluentValidation;
using TestVox.Server.Data;

namespace TestVox.Server.Validator
{
    public class UpdateUserValidator : AbstractValidator<UpdateUserRequest>
    {
        public UpdateUserValidator()
        {
            RuleFor(request => request.firstName).NotNull().NotEmpty();
            RuleFor(request => request.lastName).NotNull().NotEmpty();
            RuleFor(request => request.email).NotNull().NotEmpty().EmailAddress();
        }
    }
}
