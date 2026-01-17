import { useEffect } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useUser } from '../contexts/UserContext';
import { useSurvey } from '../contexts/SurveyContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ThankYou() {
  const { userData, clearUserData } = useUser();
  const { resetSurvey } = useSurvey();
  const { clearStorage } = useLocalStorage(userData?.sessionId || null);

  useEffect(() => {
    // Clear localStorage on mount
    if (userData?.sessionId) {
      clearStorage();
    }
  }, [userData?.sessionId, clearStorage]);

  const handleNewSession = () => {
    clearUserData();
    resetSurvey();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-center text-3xl" dir="rtl">
            תודה רבה על השתתפותך! 🎉
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center text-lg space-y-4" dir="rtl">
            <p>
              התשובות שלך נשמרו בהצלחה ויסייעו לנו לשפר את איכות הסינתזה של דיבור בעברית.
            </p>
            <p className="text-slate-600">
              התוצאות יפורסמו בסיום המחקר.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Link to="/" onClick={handleNewSession}>
              <Button variant="outline">חזור לדף הבית</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
