import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <Button variant={"elevated"}>Apply</Button>
      </div>
      <div>
        <Input placeholder="Enter your name"/>
      </div>
      <div>
        <Progress value={50}/>
      </div>
      <div>
        <Checkbox />
      </div>
      <div>
        <Textarea placeholder="Enter your message" />
      </div>
    </div>
  );
}
