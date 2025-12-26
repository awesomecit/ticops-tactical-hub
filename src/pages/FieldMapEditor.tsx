import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapEditorWrapper } from '@/components/fields/MapEditorWrapper';

const FieldMapEditor: React.FC = () => {
  const { fieldId, mapId } = useParams();
  const navigate = useNavigate();

  // Il MapEditor ha il suo header interno, quindi gli diamo tutto lo spazio
  return <MapEditorWrapper onBack={() => navigate(-1)} />;
};

export default FieldMapEditor;
