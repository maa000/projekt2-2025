<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPassword
{
    /**
     * Get the reset password notification mail message for the given URL.
     */
    protected function buildMailMessage($url)
    {
        return (new MailMessage)
            ->subject('Jelszó visszaállítás')
            ->greeting('Szia!')
            ->line('Azért kapod ezt az e-mailt, mert jelszó-visszaállítást kértek a fiókodhoz.')
            ->action('Jelszó visszaállítása', $url)
            ->line('Ha nem te kérted, akkor nincs további teendőd.')
            ->salutation('Üdvözlettel, a Tastyfiee csapata');
    }
}

