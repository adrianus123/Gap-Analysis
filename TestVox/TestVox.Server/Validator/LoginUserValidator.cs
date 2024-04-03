using FluentValidation;
using TestVox.Server.Data;

namespace TestVox.Server.Validator
{
    public class LoginUserValidator : AbstractValidator<LoginRequest>
    {
        public LoginUserValidator()
        {
            RuleFor(request => request.email).NotNull().NotEmpty();
            RuleFor(request => request.password).NotNull().NotEmpty();
        }
    }
}
