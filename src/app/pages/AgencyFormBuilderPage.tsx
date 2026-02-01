import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  Save,
  Type,
  ChevronDown,
  Upload,
  Calendar,
  CheckSquare,
  GripVertical
} from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface FormField {
  id: string;
  type: "text" | "dropdown" | "file" | "date" | "checkbox" | "textarea";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const fieldTypes = [
  { type: "text", icon: Type, label: "Text Input" },
  { type: "textarea", icon: Type, label: "Text Area" },
  { type: "dropdown", icon: ChevronDown, label: "Dropdown" },
  { type: "file", icon: Upload, label: "File Upload" },
  { type: "date", icon: Calendar, label: "Date Picker" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox" },
];

const DraggableField = ({ field, index, moveField, removeField, updateField }: any) => {
  const [{ isDragging }, drag] = useDrag({
    type: "field",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "field",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 border rounded-lg bg-white ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div className="cursor-move mt-2">
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Field Label"
              value={field.label}
              onChange={(e) => updateField(index, "label", e.target.value)}
              className="max-w-md"
            />
            <div className="flex items-center gap-2">
              <Badge variant="outline">{field.type}</Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeField(index)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {(field.type === "text" || field.type === "textarea") && (
            <Input
              placeholder="Placeholder text"
              value={field.placeholder || ""}
              onChange={(e) => updateField(index, "placeholder", e.target.value)}
            />
          )}

          {field.type === "dropdown" && (
            <div className="space-y-2">
              <Label>Dropdown Options (one per line)</Label>
              <Textarea
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                value={field.options?.join("\n") || ""}
                onChange={(e) =>
                  updateField(index, "options", e.target.value.split("\n").filter(o => o.trim()))
                }
                rows={3}
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Switch
              checked={field.required}
              onCheckedChange={(checked) => updateField(index, "required", checked)}
            />
            <Label className="text-sm">Required field</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AgencyFormBuilderPage() {
  const navigate = useNavigate();
  const [formName, setFormName] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: "",
      required: false,
      ...(type === "dropdown" && { options: [] }),
    };
    setFormFields([...formFields, newField]);
  };

  const removeField = (index: number) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: any) => {
    const updated = [...formFields];
    updated[index] = { ...updated[index], [key]: value };
    setFormFields(updated);
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    const updated = [...formFields];
    const [movedField] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedField);
    setFormFields(updated);
  };

  const handleSave = () => {
    if (!formName || !selectedCountry || !selectedUniversity || formFields.length === 0) {
      alert("Please complete all required fields and add at least one form field");
      return;
    }
    alert("✅ Application form saved successfully!");
    navigate("/agency-dashboard");
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            placeholder={field.placeholder || "Enter text"}
            disabled
          />
        );
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder || "Enter text"}
            disabled
            rows={3}
          />
        );
      case "dropdown":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
          </Select>
        );
      case "file":
        return (
          <div className="border-2 border-dashed rounded-lg p-4 text-center text-gray-400">
            <Upload className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm">Upload file</p>
          </div>
        );
      case "date":
        return (
          <Input
            type="date"
            disabled
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <input type="checkbox" disabled className="w-4 h-4" />
            <span className="text-sm text-gray-600">Checkbox option</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/agency-dashboard")}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <Building2 className="w-8 h-8 text-primary" />
                  <div>
                    <h1 className="text-xl font-semibold">Application Form Builder</h1>
                    <p className="text-sm text-gray-500">Create custom application forms for universities</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Edit" : "Preview"}
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Form
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {!showPreview ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Form Settings */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>⚙️ Form Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="formName">Form Name *</Label>
                      <Input
                        id="formName"
                        placeholder="e.g., Oxford University Application"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="university">University *</Label>
                      <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                        <SelectTrigger id="university">
                          <SelectValue placeholder="Select university" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oxford">University of Oxford</SelectItem>
                          <SelectItem value="cambridge">University of Cambridge</SelectItem>
                          <SelectItem value="imperial">Imperial College London</SelectItem>
                          <SelectItem value="ucl">UCL</SelectItem>
                          <SelectItem value="kings">King's College London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>🧩 Field Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Click to add field to form</p>
                    <div className="space-y-2">
                      {fieldTypes.map(({ type, icon: Icon, label }) => (
                        <Button
                          key={type}
                          variant="outline"
                          className="w-full justify-start gap-2"
                          onClick={() => addField(type as FormField["type"])}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                          <Plus className="w-4 h-4 ml-auto" />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Form Builder */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>📝 Form Fields</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Drag and drop to reorder fields. Configure each field's properties.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {formFields.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <Plus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-2">No fields added yet</p>
                        <p className="text-sm text-gray-400">
                          Click on field types to start building your form
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {formFields.map((field, index) => (
                          <DraggableField
                            key={field.id}
                            field={field}
                            index={index}
                            moveField={moveField}
                            removeField={removeField}
                            updateField={updateField}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Preview Mode
            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">📋 Form Preview</CardTitle>
                  <p className="text-gray-600 mt-2">
                    {formName || "Untitled Form"} - {selectedUniversity || "No University Selected"}
                  </p>
                </CardHeader>
                <CardContent>
                  {formFields.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No fields to preview. Add fields to see the form preview.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {formFields.map((field, index) => (
                        <div key={field.id} className="space-y-2">
                          <Label>
                            {field.label || `Field ${index + 1}`}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          {renderFieldPreview(field)}
                          {field.type === "dropdown" && field.options && field.options.length > 0 && (
                            <p className="text-xs text-gray-500">
                              Options: {field.options.join(", ")}
                            </p>
                          )}
                        </div>
                      ))}
                      
                      <div className="pt-6 border-t">
                        <Button disabled className="w-full bg-blue-600">
                          Submit Application
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
