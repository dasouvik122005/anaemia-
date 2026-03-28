% Printable Anaemia Hb Color Reference Strip
clear; clc;

%% Original Color Levels (UNCHANGED)
colors = [
0.8588 0.9412 0.9529;   % Severe (#DBF0F3)
0.7686 0.9059 0.9294;   % Moderate (#C4E7ED)
0.5961 0.8471 0.8863;   % Mild (#98D8E2)
0.5216 0.8275 0.8784;   % Normal (#85D3E0)
];

%% Create Figure (Print Layout)
fig = figure('Units','centimeters','Position',[2 2 22 8],'Color','w');
axis off
hold on

%% Outer Border (print card frame)
rectangle('Position',[0.5 0.5 22 7],...
'EdgeColor',[0.1 0.1 0.1],...
'LineWidth',1.2);

%% Color Blocks
box_w = 5;
box_h = 3.5;
x_start = 1.5;
y_base = 2.5;

for i = 1:4
rectangle('Position',[x_start+(i-1)*box_w y_base box_w box_h],...
'FaceColor',colors(i,:),...
'EdgeColor',[0.2 0.2 0.2],...
'LineWidth',1.5);
end

%% Labels
labels = {'SEVERE','MODERATE','MILD','NORMAL'};
ranges = {'< 7 g/dL','7 – 9.9 g/dL','10 – 11.9 g/dL','12 – 15 g/dL'};

for i = 1:4

mid = x_start + (i-0.5)*box_w;

% Hb Range
text(mid,y_base+box_h+0.6,ranges{i},...
    'FontSize',13,...
    'FontWeight','bold',...
    'HorizontalAlignment','center');

% Anaemia Type
text(mid,y_base-0.8,labels{i},...
    'FontSize',14,...
    'FontWeight','bold',...
    'HorizontalAlignment','center');

end

%% Export Print PDF
exportgraphics(fig,'Hb_Color_Strip_Print.pdf','ContentType','vector');
