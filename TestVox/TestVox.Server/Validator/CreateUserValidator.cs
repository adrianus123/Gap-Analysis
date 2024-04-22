using FluentValidation;
using TestVox.Server.Data;

namespace TestVox.Server.Validator
{
    public class CreateUserValidator : AbstractValidator<CreateUserRequest>
    {
        public CreateUserValidator()
        {
            RuleFor(user => user.firstName).NotNull().NotEmpty();
            RuleFor(user => user.lastName).NotNull().NotEmpty();
            RuleFor(user => user.email).NotNull().NotEmpty().EmailAddress();
            RuleFor(user => user.password).MinimumLength(6).NotNull().NotEmpty();
            RuleFor(user => user.repeatPassword).MinimumLength(6).NotNull().NotEmpty().Equal(user => user.password);
        }
    }
}
