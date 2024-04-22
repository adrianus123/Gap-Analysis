using FluentValidation;
using TestVox.Server.Data;

namespace TestVox.Server.Validator
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordValidator()
        {
            RuleFor(request => request.oldPassword).MinimumLength(6).NotNull().NotEmpty();
            RuleFor(request => request.newPassword).MinimumLength(6).NotNull().NotEmpty();
            RuleFor(request => request.repeatPassword).MinimumLength(6).NotNull().NotEmpty().Equal(request => request.newPassword);
        }
    }
}
